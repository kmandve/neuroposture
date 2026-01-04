from flask import Flask, render_template, Response, jsonify
import threading
import cv2
import time
from posture import PostureMonitor
from state import state
from menu_bar import MenuBar
import mediapipe as mp


app = Flask(__name__)

# Global monitor instance
monitor = None

def get_monitor():
    global monitor
    if monitor is None:
        monitor = PostureMonitor(on_update=state.update_from_posture)
    return monitor

# ============================
# Routes
# ============================
@app.route("/")
def index():
    return render_template("dashboard.html")

@app.route("/video_feed")
def video_feed():
    return Response(gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route("/api/status")
def api_status():
    snap = state.snapshot()
    return jsonify({
        "state": snap.state,
        "metrics": snap.metrics,
        "baseline": snap.baseline,
        "sustained_bad": snap.sustained_bad,
        "voice_enabled": state.voice_enabled
    })

@app.route("/api/calibrate")
def api_calibrate():
    mon = get_monitor()
    # Clear old position data and wait for fresh readings
    mon.metric_history.clear()
    time.sleep(0.3)  # Wait ~10 frames for fresh data
    success = mon.calibrate()
    if success:
        state.set_baseline(mon.good_posture)
    return jsonify({"success": success})

@app.route("/api/toggle_voice")
def api_toggle_voice():
    enabled = state.toggle_voice()
    return jsonify({"enabled": enabled})

# ============================
# Frame Generator
# ============================

# ... imports ...

mp_pose = mp.solutions.pose
mp_drawing = mp.solutions.drawing_utils

# ...

def gen_frames():
    mon = get_monitor()
    while True:
        if mon.latest_frame is not None:
            # Work on a copy to avoid threading issues on the raw frame if possible, 
            # though here we just process what we have.
            frame = mon.latest_frame.copy()
            
            # Draw Landmarks
            if mon.latest_results and mon.latest_results.pose_landmarks:
                mp_drawing.draw_landmarks(
                    frame, 
                    mon.latest_results.pose_landmarks, 
                    mp_pose.POSE_CONNECTIONS
                )
            
            # Draw Status
            snap = state.snapshot()
            status_text = {
                "good": "OPTIMAL",
                "warning": "WARNING",
                "bad": "CRITICAL",
                "uncalibrated": "UNCALIBRATED"
            }.get(snap.state, "UNKNOWN")
            
            color = {
                "good": (0, 255, 0),      # Green
                "warning": (0, 255, 255), # Yellow
                "bad": (0, 0, 255),       # Red
                "uncalibrated": (200, 200, 200)
            }.get(snap.state, (255, 255, 255))
            
            cv2.putText(frame, f"STATUS: {status_text}", (20, 50), 
                        cv2.FONT_HERSHEY_SIMPLEX, 1, color, 2)

            # Encode frame as JPEG
            ret, buffer = cv2.imencode('.jpg', frame)
            frame_bytes = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')
        else:
            time.sleep(0.05)

# ============================
# Main Helper
# ============================
def run_flask():
    app.run(host="0.0.0.0", port=5000, debug=False, use_reloader=False)

def do_calibrate():
    """Calibration helper for menu bar"""
    mon = get_monitor()
    mon.metric_history.clear()
    time.sleep(0.3)
    if mon.calibrate():
        state.set_baseline(mon.good_posture)

if __name__ == "__main__":
    # 0. Check for API Key & Startup Configuration
    import ai_feedback
    from config_manager import get_api_key, save_api_key
    import rumps
    
    if not get_api_key():
        # Needed because rumps.Window might need a run loop or just be blocking
        # but for simple input prompt it often works directly or necessitates a simple app context
        # We'll try a simple Window run. If it fails, we might need a full App structure, 
        # but usually for configuration this is fine.
        window = rumps.Window(
            message="To enable AI posture feedback, please enter your OpenAI API Key.\nYou can find this at platform.openai.com",
            title="Posture Monitor Configuration",
            default_text="",
            ok="Save Key",
            cancel="Skip"
        )
        response = window.run()
        if response.clicked:
            save_api_key(response.text)
            ai_feedback.initialize_client()
            rumps.alert("Configuration", "API Key saved! AI features enabled.")
        else:
            rumps.alert("Configuration", "Proceeding without AI feedback.")

    # 1. Start Posture Monitor
    mon = get_monitor()
    mon.start()

    # 2. Start Flask in background thread
    t = threading.Thread(target=run_flask, daemon=True)
    t.start()

    # 3. Start Menu Bar (Blocking CLI / GUI Loop)
    # Rumps needs to be on the main thread often, or at least blocks.
    print("🚀 System Online. Dashboard at http://localhost:5000")
    MenuBar(calibrate_callback=do_calibrate).run()

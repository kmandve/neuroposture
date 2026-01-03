import cv2
import mediapipe as mp
import math
import time
from collections import deque
from threading import Thread

# ============================
# CONFIG (FRONTAL-CAM SAFE)
# ============================
BAD_POSTURE_TIME = 5
SHOULDER_LEVEL_THRESH = 0.024
HEAD_TILT_THRESH = 0.04
HEAD_DROP_RATIO = 0.12
SMOOTHING_WINDOW = 7

# ============================
# MediaPipe setup
# ============================
mp_pose = mp.solutions.pose

# ============================
# Helpers
# ============================
def avg(a, b):
    return {'x': (a.x + b.x) / 2, 'y': (a.y + b.y) / 2}

def dist(p1, p2):
    return math.hypot(p1['x'] - p2['x'], p1['y'] - p2['y'])

def visible(lm, idx):
    return lm[idx].visibility > 0.6

def posture_metrics(lm):
    # Use ears instead of nose (frontal safe)
    left_ear, right_ear = lm[7], lm[8]
    left_sh, right_sh = lm[11], lm[12]

    if not all(visible(lm, i) for i in (7, 8, 11, 12)):
        return None

    head = avg(left_ear, right_ear)
    shoulders = avg(left_sh, right_sh)

    shoulder_width = dist(
        {'x': left_sh.x, 'y': left_sh.y},
        {'x': right_sh.x, 'y': right_sh.y}
    )

    shoulder_level = abs(left_sh.y - right_sh.y)
    head_tilt = abs(left_ear.y - right_ear.y)
    head_drop = (head['y'] - shoulders['y']) / shoulder_width

    return shoulder_level, head_tilt, head_drop


# ============================
# Posture Monitor
# ============================
class PostureMonitor:
    def __init__(self, on_update=None, camera_index=0):
        self.on_update = on_update
        self.cap = cv2.VideoCapture(camera_index)

        self.pose = mp_pose.Pose(
            model_complexity=1,
            smooth_landmarks=True,
            min_detection_confidence=0.6,
            min_tracking_confidence=0.6
        )

        self.good_posture = None
        self.bad_since = None
        self.metric_history = deque(maxlen=SMOOTHING_WINDOW)

        self.running = False

        self.latest_frame = None
        self.latest_results = None

    def calibrate(self):
        if not self.metric_history:
            return False

        self.good_posture = tuple(
            sum(x[i] for x in self.metric_history) / len(self.metric_history)
            for i in range(3)
        )
        self.bad_since = None
        return True

    def start(self):
        if self.running:
            return
        self.running = True
        Thread(target=self._loop, daemon=True).start()

    def stop(self):
        self.running = False
        self.cap.release()
        self.pose.close()

    def _is_bad(self, curr):
        sh, ht, hd = curr
        g_sh, g_ht, g_hd = self.good_posture

        return (
            abs(sh - g_sh) > SHOULDER_LEVEL_THRESH or
            abs(ht - g_ht) > HEAD_TILT_THRESH or
            abs(hd - g_hd) > HEAD_DROP_RATIO
        )

    def _loop(self):
        while self.running:
            ret, frame = self.cap.read()
            if not ret:
                time.sleep(0.01)
                continue

            frame = cv2.flip(frame, 1)
            rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            self.latest_frame = frame 
            results = self.pose.process(rgb)
            self.latest_results = results

            if not results.pose_landmarks:
                time.sleep(0.01)
                continue

            metrics = posture_metrics(results.pose_landmarks.landmark)
            if not metrics:
                time.sleep(0.01)
                continue

            self.metric_history.append(metrics)
            smooth = tuple(
                sum(x[i] for x in self.metric_history) / len(self.metric_history)
                for i in range(3)
            )

            if not self.good_posture:
                if self.on_update:
                    self.on_update("uncalibrated", {})
                time.sleep(0.03)
                continue

            bad = self._is_bad(smooth)

            if bad:
                if self.bad_since is None:
                    self.bad_since = time.time()
            else:
                self.bad_since = None

            sustained_bad = (
                self.bad_since is not None and
                (time.time() - self.bad_since) > BAD_POSTURE_TIME
            )

            if self.on_update:
                self.on_update(
                    "bad" if bad else "good",
                    {
                        "metrics": smooth,
                        "sustained_bad": sustained_bad
                    }
                )

            time.sleep(0.03)  # ~30 FPS
# ============================
# End of posture.py
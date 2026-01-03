# 🧘 PostureMonitor

A real-time posture monitoring application for macOS that uses your webcam and AI to help you maintain good posture.

![macOS](https://img.shields.io/badge/macOS-supported-blue)
![Python](https://img.shields.io/badge/Python-3.9+-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

## ✨ Features

- **Real-time Pose Detection** — Uses MediaPipe to track your shoulders, head tilt, and head drop
- **Live Dashboard** — Beautiful web interface showing your camera feed with skeletal overlay
- **Menu Bar Integration** — macOS menu bar icon that changes color based on posture status
- **AI-Powered Feedback** — OpenAI generates gentle, personalized voice reminders
- **Voice Alerts** — Text-to-speech notifications when your posture needs attention
- **Calibration** — Easily calibrate to your ideal sitting position

## 🎯 Status Indicators

| Status | Menu Bar | Description |
|--------|----------|-------------|
| 🟢 OPTIMAL | Green | Good posture maintained |
| 🟡 WARNING | Yellow | Posture drifting (< 5 seconds) |
| 🔴 CRITICAL | Red | Sustained bad posture (> 5 seconds) |
| ⚪ UNCALIBRATED | White | Needs calibration |

## 📋 Requirements

- macOS 10.13+
- Python 3.9+
- Webcam
- OpenAI API key (for AI feedback)

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/posture-monitor.git
cd posture-monitor
```

### 2. Create a virtual environment
```bash
python3 -m venv .venv
source .venv/bin/activate
```

### 3. Install dependencies
```bash
pip install -r requirements.txt
```

### 4. Configure OpenAI API key
Create a `.env` file in the project root:
```bash
OPENAI_API_KEY=sk-your-api-key-here
```

### 5. Run the application
```bash
python app.py
```

### 6. Use the app
1. A menu bar icon (⚪) will appear
2. Open the dashboard at `http://localhost:5000`
3. Sit in your ideal posture and click **Calibrate**
4. The system will monitor your posture and alert you when needed

---

## 🏗️ Building with PyInstaller

Create a standalone `.app` that others can use without installing Python.

### Prerequisites
```bash
pip install pyinstaller
```

### Build Command
```bash
pyinstaller PostureMonitor.spec --noconfirm
```

### Output
The built application will be at:
```
dist/PostureMonitor.app
```

### Distribute
1. Right-click `PostureMonitor.app` → **Compress**
2. Share the `PostureMonitor.zip` file
3. Recipients: Right-click → **Open** (first time only, macOS security)

> **Note:** The app will be ~300-500MB due to bundled dependencies (MediaPipe, OpenCV, etc.)

---

## 📁 Project Structure

```
posture-monitor/
├── app.py              # Main entry point, Flask server, frame generator
├── posture.py          # MediaPipe pose detection & posture analysis
├── state.py            # Global application state management
├── menu_bar.py         # macOS menu bar integration (rumps)
├── voice.py            # Text-to-speech using edge-tts
├── ai_feedback.py      # OpenAI-powered personalized feedback
├── templates/
│   └── dashboard.html  # Web dashboard template
├── static/
│   ├── style.css       # Dashboard styling
│   └── dashboard.js    # Dashboard frontend logic
├── requirements.txt    # Python dependencies
├── PostureMonitor.spec # PyInstaller build configuration
└── .env                # OpenAI API key (not in git)
```

---

## ⚙️ Configuration

### Posture Thresholds (posture.py)

```python
BAD_POSTURE_TIME = 5          # Seconds before "bad" state triggers
SHOULDER_LEVEL_THRESH = 0.024 # Shoulder imbalance sensitivity
HEAD_TILT_THRESH = 0.04       # Head tilt sensitivity
HEAD_DROP_RATIO = 0.12        # Forward head drop sensitivity
```

### Voice Settings (voice.py)

```python
VOICE = "en-US-AriaNeural"    # Microsoft Edge TTS voice
RATE = "+0%"                   # Speech rate
COOLDOWN = 12                  # Seconds between voice alerts
```

### State Settings (state.py)

```python
VOICE_COOLDOWN = 15           # Seconds between AI voice feedback
STATE_DEBOUNCE = 0.5          # Debounce for state changes
```

---

## 🔌 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Dashboard web interface |
| `/video_feed` | GET | MJPEG video stream |
| `/api/status` | GET | Current posture state & metrics |
| `/api/calibrate` | GET | Trigger calibration |
| `/api/toggle_voice` | GET | Toggle voice alerts |

---

## 🛠️ Development

### Running in Development Mode
```bash
python app.py
```

### Modifying the Dashboard
- Edit `templates/dashboard.html` for structure
- Edit `static/style.css` for styling
- Edit `static/dashboard.js` for behavior

### Adding New Posture Metrics
Edit `posture.py` → `posture_metrics()` function to add new measurements.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [MediaPipe](https://mediapipe.dev/) - Pose detection
- [OpenAI](https://openai.com/) - AI-powered feedback generation
- [rumps](https://github.com/jaredks/rumps) - macOS menu bar integration
- [edge-tts](https://github.com/rany2/edge-tts) - Text-to-speech
- [Flask](https://flask.palletsprojects.com/) - Web framework

---

**Made with ❤️ for better posture**

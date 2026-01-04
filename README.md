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

## 📥 Installation (Recommended)

No coding or Python knowledge required!

1. **Download**: Go to the [Releases Page](https://github.com/yourusername/posture-monitor/releases) and download the latest `PostureMonitor.zip`.
2. **Install**: Unzip the file and drag `PostureMonitor.app` to your Applications folder (or keep it anywhere).
3. **Open**: Double-click `PostureMonitor.app` to launch.
   > **Note**: On the first launch, macOS might prevent the app from opening because it's not notarized. To bypass this correctly:
   > 1. Right-click (or Control-click) the app icon.
   > 2. Select **Open**.
   > 3. Click **Open** again in the security dialog.

### 🔑 First Run Setup

When you first launch the app, you will see a configuration window.

1. **API Key**: Enter your OpenAI API Key (get one at [platform.openai.com](https://platform.openai.com)). This is required for the AI generated feedback.
2. **Save**: Click "Save Key". The app will remember this for future sessions.

## 🎯 Usage

1. **Menu Bar**: Look for the icon in your menu bar:
   - 🟢 **Green**: Good posture
   - 🟡 **Yellow**: Posture drifting
   - 🔴 **Red**: Sustained bad posture
   - ⚪ **White**: Needs calibration
2. **Dashboard**: Click the menu icon and select **Open Dashboard** to view the live camera feed and metrics.
3. **Calibration**: Sit in your ideal posture, then click **Calibrate** in the menu (or via the dashboard).

---

## 🛠️ Building from Source

If you prefer to run from source or build it yourself:

### Requirements
- macOS 10.13+
- Python 3.9+
- Webcam
- OpenAI API key

### Steps

1. **Clone & Setup**:
   ```bash
   git clone https://github.com/yourusername/posture-monitor.git
   cd posture-monitor
   python3 -m venv .venv
   source .venv/bin/activate
   pip install -r requirements.txt
   ```

2. **Run Dev Mode**:
   ```bash
   python app.py
   ```

3. **Build Binary**:
   This creates the standalone `.app` bundle.
   ```bash
   pip install pyinstaller
   pyinstaller PostureMonitor.spec --noconfirm
   # App will be in dist/PostureMonitor.app
   ```

---

## 📁 Data location

- **Config**: Your API key is stored locally at `~/.posture_monitor/config.json`.
- **Logs**: Application logs are output to stderr/stdout (viewable if running via terminal).

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [MediaPipe](https://mediapipe.dev/) - Pose detection
- [rumps](https://github.com/jaredks/rumps) - macOS menu bar integration
- [edge-tts](https://github.com/rany2/edge-tts) - Text-to-speech

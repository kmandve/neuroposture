import rumps
import webbrowser
from state import state


class MenuBar(rumps.App):
    def __init__(self, calibrate_callback=None):
        super().__init__("●", quit_button="Quit")
        self.state = "good"
        self.update_icon()
        self.voice_enabled = True
        self.calibrate_callback = calibrate_callback

    @rumps.clicked("Calibrate")
    def calibrate(self, _):
        if self.calibrate_callback:
            self.calibrate_callback()
            rumps.notification("Posture", "Calibration", "Baseline captured!")
        else:
            rumps.notification("Posture", "Error", "Calibration not available")

    @rumps.timer(0.5)
    def check_state(self, _):
        if self.state != state.state:
            self.state = state.state
            self.update_icon()
        if self.voice_enabled != state.voice_enabled:
            self.voice_enabled = state.voice_enabled
            self.update_voice_title()

    @rumps.clicked("Open Dashboard")
    def open_dashboard(self, _):
        webbrowser.open("http://localhost:5000")
    
    @rumps.clicked("Voice Alerts: On")
    def toggle_voice(self, sender):
        self.voice_enabled = not self.voice_enabled

        # Update menu label
        self.update_voice_title(sender, self.voice_enabled)

        # Sync to global app state
        state.voice_enabled = self.voice_enabled


    def update_icon(self):
        colors = {
            "good": "🟢",
            "warning": "🟡",
            "bad": "🔴",
            "uncalibrated": "⚪"
        }
        self.title = colors[self.state]

    def update_state(self, new_state):
        if new_state != self.state:
            self.state = new_state
            self.update_icon()
    
    def update_voice_title(self, sender=None, new_state=None):
        # Get the menu item - either from sender or by finding it
        title_on = "Voice Alerts: On"
        title_off = "Voice Alerts: Off"
        new_title = title_on if self.voice_enabled else title_off
        
        if sender:
            sender.title = new_title
        else:
            # Find the voice menu item by its current title
            for key in [title_on, title_off]:
                if key in self.menu:
                    self.menu[key].title = new_title
                    break

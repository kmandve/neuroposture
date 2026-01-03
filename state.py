import time
from dataclasses import dataclass
from typing import Optional, Tuple
from voice import speak
from ai_feedback import get_feedback

# ============================
# CONFIG
# ============================
VOICE_COOLDOWN = 15       # seconds
STATE_DEBOUNCE = 0.5      # seconds

# ============================
# Data containers
# ============================
@dataclass
class PostureSnapshot:
    state: str                      # good | warning | bad | uncalibrated
    metrics: Optional[Tuple[float]] # (shoulder, tilt, drop)
    baseline: Optional[Tuple[float]]
    sustained_bad: bool
    timestamp: float


# ============================
# Global state (single source of truth)
# ============================
class AppState:
    def __init__(self):
        self.state = "uncalibrated"

        self.metrics = None
        self.baseline = None
        self.sustained_bad = False

        self._last_state_change = 0.0
        self._last_voice_time = 0.0
        self._last_ai_time = 0.0

        self.voice_enabled = True

    # ------------------------
    # Update from posture.py
    # ------------------------
    def update_from_posture(self, posture_state, info):
        now = time.time()

        # Update raw data
        self.metrics = info.get("metrics")
        self.sustained_bad = info.get("sustained_bad", False)

        # Handle calibration
        if posture_state == "uncalibrated":
            self.state = "uncalibrated"
            return

        # Map posture → app state
        new_state = self._map_state(posture_state, self.sustained_bad)

        # Debounce state flips
        if new_state != self.state:
            if now - self._last_state_change < STATE_DEBOUNCE:
                return
            self.state = new_state
            self._last_state_change = now
            
            # Voice feedback when transitioning to bad
            if new_state == "bad" and self.can_speak():
                feedback = get_feedback(self.metrics, self.baseline)
                speak(feedback)

    # ------------------------
    # Baseline handling
    # ------------------------
    def set_baseline(self, baseline):
        self.baseline = baseline
        self.state = "good"
        self._last_state_change = time.time()

    # ------------------------
    # Decision helpers
    # ------------------------
    def should_speak(self):
        if self.state != "bad":
            return False

        now = time.time()
        if now - self._last_voice_time < VOICE_COOLDOWN:
            return False

        self._last_voice_time = now
        return True
    
    def toggle_voice(self):
        self.voice_enabled = not self.voice_enabled
        return self.voice_enabled

    def can_speak(self):
        return self.voice_enabled and self.should_speak()

    # ------------------------
    # Snapshot (read-only)
    # ------------------------
    def snapshot(self) -> PostureSnapshot:
        return PostureSnapshot(
            state=self.state,
            metrics=self.metrics,
            baseline=self.baseline,
            sustained_bad=self.sustained_bad,
            timestamp=time.time(),
        )

    # ------------------------
    # Internal helpers
    # ------------------------
    def _map_state(self, posture_state, sustained_bad):
        if posture_state == "good":
            return "good"
        if sustained_bad:
            return "bad"
        return "warning"


# ============================
# Singleton instance
# ============================
state = AppState()

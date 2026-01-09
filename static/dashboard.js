document.addEventListener('DOMContentLoaded', () => {

    // Elements
    const statusBadge = document.getElementById('global-status');
    const logs = document.getElementById('log-feed');
    const connectDot = document.getElementById('connection-dot');

    // Bars
    const barShoulder = document.getElementById('bar-shoulder');
    const barTilt = document.getElementById('bar-tilt');
    const barDrop = document.getElementById('bar-drop');

    // Values
    const valShoulder = document.getElementById('val-shoulder');
    const valTilt = document.getElementById('val-tilt');
    const valDrop = document.getElementById('val-drop');

    // Controls
    const btnCalibrate = document.getElementById('btn-calibrate');
    const btnVoice = document.getElementById('btn-voice');
    const voiceText = document.getElementById('voice-text');

    // State Mapping
    const STATE_CONFIG = {
        'good': { text: 'OPTIMAL', class: 'status-good' },
        'warning': { text: 'WARNING', class: 'status-warning' },
        'bad': { text: 'CRITICAL', class: 'status-bad' },
        'uncalibrated': { text: 'UNCALIBRATED', class: 'status-uncalibrated' }
    };

    function addLog(msg) {
        const div = document.createElement('div');
        div.className = 'log-entry';
        div.innerText = `> ${msg}`;
        logs.prepend(div); // Add to top
        if (logs.children.length > 20) logs.lastChild.remove();
    }

    function updateMetrics(metrics, baseline) {
        if (!metrics) return;

        // metrics tuple: (shoulder, tilt, drop)
        const [shoulder, tilt, drop] = metrics;

        // If we have a baseline, show deviation from it; otherwise show raw values
        let dShoulder = shoulder;
        let dTilt = tilt;
        let dDrop = drop;

        if (baseline) {
            const [bShoulder, bTilt, bDrop] = baseline;
            dShoulder = shoulder - bShoulder;
            dTilt = tilt - bTilt;
            dDrop = drop - bDrop;
        }

        // Scaling factors based on thresholds (Shoulder ~0.034, Tilt ~0.04, Drop ~0.12)
        const pShoulder = Math.min(Math.abs(dShoulder) / 0.034 * 100, 100);
        const pTilt = Math.min(Math.abs(dTilt) / 0.057 * 100, 100);
        const pDrop = Math.min(Math.abs(dDrop) / 0.17 * 100, 100);

        barShoulder.style.width = `${pShoulder}%`;
        valShoulder.innerText = Math.abs(dShoulder).toFixed(3);

        barTilt.style.width = `${pTilt}%`;
        valTilt.innerText = Math.abs(dTilt).toFixed(3);

        barDrop.style.width = `${pDrop}%`;
        valDrop.innerText = Math.abs(dDrop).toFixed(3);

        // Color coding bars - green when close to baseline, red when far
        // Color coding bars
        // Helper to toggle danger class
        const setStatus = (el, isBad) => {
            if (isBad) el.classList.add('danger');
            else el.classList.remove('danger');
            el.style.backgroundColor = ''; // Clear inline if present
        };

        setStatus(barShoulder, pShoulder > 70);
        setStatus(barTilt, pTilt > 70);
        setStatus(barDrop, pDrop > 70);
    }

    async function fetchStatus() {
        try {
            const res = await fetch('/api/status');
            const data = await res.json();

            // Update Status Badge
            statusBadge.className = 'status-badge ' + (STATE_CONFIG[data.state]?.class || '');
            statusBadge.innerText = STATE_CONFIG[data.state]?.text || data.state.toUpperCase();

            // Update Voice Button to match backend state
            if (data.voice_enabled !== undefined) {
                voiceText.innerText = data.voice_enabled ? "VOICE: ON" : "VOICE: OFF";
                if (data.voice_enabled) {
                    btnVoice.style.borderColor = "var(--accent-secondary)";
                    btnVoice.style.color = "var(--accent-secondary)";
                } else {
                    btnVoice.style.borderColor = "var(--text-muted)";
                    btnVoice.style.color = "var(--text-muted)";
                }
            }

            updateMetrics(data.metrics, data.baseline);

            connectDot.style.opacity = "1";

        } catch (e) {
            connectDot.style.opacity = "0.2";
            console.error("Connection lost", e);
        }
    }

    // Controls
    btnCalibrate.addEventListener('click', async () => {
        addLog("Initiating calibration sequence...");
        await fetch('/api/calibrate');
        addLog("Calibration command sent.");
    });

    btnVoice.addEventListener('click', async () => {
        const res = await fetch('/api/toggle_voice');
        const data = await res.json();
        const enabled = data.enabled;

        voiceText.innerText = enabled ? "VOICE: ON" : "VOICE: OFF";
        addLog(`Voice feedback ${enabled ? 'ACTIVATED' : 'MUTED'}`);

        btnVoice.classList.toggle('toggle', !enabled); // Visual style check?
        // Actually my toggle class was just for color change, let's just keep logic simple
        if (enabled) {
            btnVoice.style.borderColor = "var(--accent-secondary)";
            btnVoice.style.color = "var(--accent-secondary)";
        } else {
            btnVoice.style.borderColor = "var(--text-muted)";
            btnVoice.style.color = "var(--text-muted)";
        }
    });

    // Poll
    setInterval(fetchStatus, 500);
    addLog("Dashboard connecting...");
});

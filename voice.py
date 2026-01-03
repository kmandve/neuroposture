import asyncio
import edge_tts
import tempfile
import subprocess
import time

VOICE = "en-US-AriaNeural"
RATE = "+0%"
PITCH = "+0Hz"
COOLDOWN = 12

_last_spoken = 0

async def _speak_async(text):
    with tempfile.NamedTemporaryFile(suffix=".mp3", delete=False) as f:
        output_path = f.name

    communicate = edge_tts.Communicate(
        text=text,
        voice=VOICE,
        rate=RATE,
        pitch=PITCH,
    )

    await communicate.save(output_path)

    subprocess.Popen(["afplay", output_path])

def speak(text, force=False):
    global _last_spoken
    now = time.time()

    if not force and (now - _last_spoken) < COOLDOWN:
        return

    _last_spoken = now
    asyncio.run(_speak_async(text))

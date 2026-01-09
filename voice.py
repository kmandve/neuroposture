import asyncio
import edge_tts
import os
import subprocess
import time
import uuid
import threading

VOICE = "en-US-AriaNeural"
RATE = "+0%"
PITCH = "+0Hz"
COOLDOWN = 12

_last_spoken = 0

async def _generate_and_play(text):
    # Use explicit temp path to avoid file handle issues
    filename = f"/tmp/neuroposture_{uuid.uuid4()}.mp3"
    try:
        communicate = edge_tts.Communicate(text, VOICE, rate=RATE, pitch=PITCH)
        await communicate.save(filename)
        
        # Verify file exists and has content
        if os.path.exists(filename) and os.path.getsize(filename) > 0:
            # Play and wait (since we are in a background thread)
            subprocess.run(["afplay", filename])
        else:
            print("Error: TTS file generation failed")
            
    except Exception as e:
        print(f"TTS Error: {e}")
    finally:
        # Cleanup
        if os.path.exists(filename):
            try:
                os.remove(filename)
            except:
                pass

def _speak_thread(text):
    try:
        asyncio.run(_generate_and_play(text))
    except Exception as e:
        print(f"Speech thread error: {e}")

def speak(text, force=False):
    global _last_spoken
    now = time.time()

    if not force and (now - _last_spoken) < COOLDOWN:
        return

    _last_spoken = now
    
    # Launch in separate thread to prevent blocking the camera feed
    threading.Thread(target=_speak_thread, args=(text,), daemon=True).start()

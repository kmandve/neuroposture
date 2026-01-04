from openai import OpenAI
from config_manager import get_api_key

# Load API key from config
client = None

def initialize_client():
    global client
    api_key = get_api_key()
    if api_key:
        try:
            client = OpenAI(api_key=api_key)
        except Exception as e:
            print(f"Error initializing OpenAI client: {e}")

# Try to initialize on import
initialize_client()

SYSTEM_PROMPT = """You are a gentle, caring posture wellness companion. 
Your role is to give warm, encouraging reminders about posture - never commanding or intrusive.
Keep responses to ONE short sentence (under 15 words).
Be supportive and kind, like a caring friend noticing you might be uncomfortable.
Never use words like "must", "should", "need to", "stop", or "don't"."""


def get_feedback(metrics, baseline):
    """Generate personalized feedback based on posture metrics."""
    if not client:
        return _get_fallback_feedback()

    if not metrics or not baseline:
        return "A posture check might feel great right now."
    
    shoulder, tilt, drop = metrics
    b_shoulder, b_tilt, b_drop = baseline
    
    # Calculate deviations
    d_shoulder = abs(shoulder - b_shoulder)
    d_tilt = abs(tilt - b_tilt)
    d_drop = abs(drop - b_drop)
    
    # Identify the main issue
    issues = []
    if d_shoulder > 0.02:
        issues.append("shoulders are a bit uneven")
    if d_tilt > 0.03:
        issues.append("head is tilting slightly")
    if d_drop > 0.08:
        issues.append("head is dropping forward a bit")
    
    issue_text = ", ".join(issues) if issues else "posture has drifted slightly"
    
    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": f"The user's {issue_text}. Give a gentle, one-sentence reminder."}
            ],
            max_tokens=50,
            temperature=0.8
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        print(f"AI feedback error: {e}")
        return _get_fallback_feedback()


def _get_fallback_feedback():
    """Fallback messages when API is unavailable."""
    import random
    fallbacks = [
        "A little stretch might feel wonderful right now.",
        "Your body might appreciate a gentle adjustment.",
        "Taking a moment to reset could feel really nice.",
        "A quick posture check could be refreshing.",
        "Your shoulders might enjoy a gentle roll back."
    ]
    return random.choice(fallbacks)

import json
import os
from pathlib import Path

CONFIG_DIR = Path.home() / ".posture_monitor"
CONFIG_FILE = CONFIG_DIR / "config.json"

def ensure_config_dir():
    """Ensure the configuration directory exists."""
    if not CONFIG_DIR.exists():
        CONFIG_DIR.mkdir(parents=True, exist_ok=True)

def save_api_key(api_key):
    """Save the OpenAI API key to the config file."""
    ensure_config_dir()
    config = {}
    if CONFIG_FILE.exists():
        try:
            with open(CONFIG_FILE, 'r') as f:
                config = json.load(f)
        except json.JSONDecodeError:
            pass
    
    config['openai_api_key'] = api_key.strip()
    
    # Set rw------- permissions for security
    with open(CONFIG_FILE, 'w') as f:
        json.dump(config, f)
    
    try:
        os.chmod(CONFIG_FILE, 0o600)
    except Exception:
        pass # Best effort permission setting

def get_api_key():
    """Retrieve the OpenAI API key from the config file."""
    if not CONFIG_FILE.exists():
        return None
    
    try:
        with open(CONFIG_FILE, 'r') as f:
            config = json.load(f)
            return config.get('openai_api_key')
    except (json.JSONDecodeError, OSError):
        return None

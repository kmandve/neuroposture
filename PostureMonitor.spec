# -*- mode: python ; coding: utf-8 -*-
# PostureMonitor.spec - PyInstaller build configuration

import os
import sys
from PyInstaller.utils.hooks import collect_data_files, collect_submodules

block_cipher = None

# Collect all mediapipe data files (model files, etc.)
mediapipe_datas = collect_data_files('mediapipe')

a = Analysis(
    ['app.py'],
    pathex=[],
    binaries=[],
    datas=[
        ('templates', 'templates'),
        ('static', 'static'),
    ] + mediapipe_datas,
    hiddenimports=[
        'mediapipe',
        'mediapipe.python.solutions.pose',
        'cv2',
        'flask',
        'rumps',
        'edge_tts',
        'openai',
        'config_manager',
        'ai_feedback',
    ] + collect_submodules('mediapipe'),
    hookspath=[],
    hooksconfig={},
    runtime_hooks=[],
    excludes=[],
    win_no_prefer_redirects=False,
    win_private_assemblies=False,
    cipher=block_cipher,
    noarchive=False,
)

pyz = PYZ(a.pure, a.zipped_data, cipher=block_cipher)

exe = EXE(
    pyz,
    a.scripts,
    [],
    exclude_binaries=True,
    name='PostureMonitor',
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    console=False,
    disable_windowed_traceback=False,
    argv_emulation=True,
    target_arch=None,
    codesign_identity=None,
    entitlements_file=None,
)

coll = COLLECT(
    exe,
    a.binaries,
    a.zipfiles,
    a.datas,
    strip=False,
    upx=True,
    upx_exclude=[],
    name='PostureMonitor',
)

app = BUNDLE(
    coll,
    name='PostureMonitor.app',
    icon=None,
    bundle_identifier='com.posture.monitor',
    info_plist={
        'NSCameraUsageDescription': 'PostureMonitor needs camera access to monitor your posture.',
        'NSMicrophoneUsageDescription': 'PostureMonitor may use audio for voice feedback.',
        'CFBundleShortVersionString': '1.0.0',
    },
)

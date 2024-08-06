import os


class Config:
    UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'uploads')
    OUTPUT_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'outputs')
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB

import os


class Config:
    UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'uploads')
    OUTPUT_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'outputs')
    FONT_FILE_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'static', 'fonts')
    MAX_CONTENT_LENGTH = 500 * 1024 * 1024  # 500MB

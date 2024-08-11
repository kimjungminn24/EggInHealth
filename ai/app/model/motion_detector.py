from flask import Flask

from app.model.processors import biceps_curl_processor, squat_processor

app = Flask(__name__)


def detect(file_name, mode):
    if mode == 0:
        squat_processor.detect(file_name)
    elif mode == 1:
        biceps_curl_processor.detect(file_name)

from app.model.processors import squat_processor
from flask import Flask, current_app

app = Flask(__name__)


def detect(file_name):
    squat_processor.detect(file_name)

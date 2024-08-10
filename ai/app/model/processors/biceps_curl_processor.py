import os
import cv2
import mediapipe as mp

from flask import Flask, current_app
from app.util.landmark_utils import calculate_angle

mp_pose = mp.solutions.pose
mp_drawing = mp.solutions.drawing_utils

app = Flask(__name__)


def get_landmarks_coordinates(landmarks, side):
    return [
        [landmarks[getattr(mp_pose.PoseLandmark, f'{side}_SHOULDER').value].x,
         landmarks[getattr(mp_pose.PoseLandmark, f'{side}_SHOULDER').value].y],
        [landmarks[getattr(mp_pose.PoseLandmark, f'{side}_ELBOW').value].x,
         landmarks[getattr(mp_pose.PoseLandmark, f'{side}_ELBOW').value].y],
        [landmarks[getattr(mp_pose.PoseLandmark, f'{side}_WRIST').value].x,
         landmarks[getattr(mp_pose.PoseLandmark, f'{side}_WRIST').value].y],
    ]


def calculate_angles(landmarks, side):
    shoulder, elbow, wrist = get_landmarks_coordinates(landmarks, side.upper())

    elbow_angle = calculate_angle(shoulder, elbow, wrist)

    return elbow_angle


def detect(file_name):
    input_path = os.path.join(current_app.config['UPLOAD_FOLDER'], file_name)
    output_path = os.path.join(current_app.config['OUTPUT_FOLDER'], file_name)
    font_path = os.path.join(current_app.config['FONT_FILE_FOLDER'], 'Pretendard-Medium.ttf')

    cap = cv2.VideoCapture(file_name)

    if not cap.isOpened():
        app.logger.error(f"Error opening video file {file_name}")
        return

    frame_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    frame_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = int(cap.get(cv2.CAP_PROP_FPS))

    output_video = cv2.VideoWriter(output_path, cv2.VideoWriter_fourcc(*'mp4v'), fps, (frame_width, frame_height))

    stage = ''

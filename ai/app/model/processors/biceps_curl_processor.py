import os

import cv2
import mediapipe as mp
from flask import Flask, current_app

from app.util.drawing_util import put_text_utf8
from app.util.landmark_utils import calculate_angle

mp_pose = mp.solutions.pose
mp_drawing = mp.solutions.drawing_utils

app = Flask(__name__)


def get_landmarks_coordinates(landmarks, side):
    points = ['SHOULDER', 'ELBOW', 'WRIST']
    return [
        [landmarks[getattr(mp_pose.PoseLandmark, f'{side}_{point}').value].x,
         landmarks[getattr(mp_pose.PoseLandmark, f'{side}_{point}').value].y]
        for point in points
    ]


def calculate_angles(landmarks, side):
    shoulder, elbow, wrist = get_landmarks_coordinates(landmarks, side.upper())

    elbow_angle = calculate_angle(shoulder, elbow, wrist)

    return elbow_angle


def update_stage_and_feedback(counter, feedback_counter, prev_elbow_angle, elbow_angle, stage):
    curr_stage = stage

    if prev_elbow_angle is not None:
        if prev_elbow_angle > elbow_angle:
            curr_stage = 'down'  # 팔 굽히기
        elif prev_elbow_angle < elbow_angle:
            curr_stage = 'up'  # 팔 펴기

        if stage == 'down' and curr_stage == 'up':
            counter += 1
            if elbow_angle > 50:
                feedback_counter = 50

    return curr_stage, feedback_counter, counter


def detect(file_name):
    input_path = str(os.path.join(current_app.config['UPLOAD_FOLDER'], file_name))
    output_path = str(os.path.join(current_app.config['OUTPUT_FOLDER'], file_name))
    font_path = str(os.path.join(current_app.config['FONT_FILE_FOLDER'], 'Pretendard-Medium.ttf'))

    cap = cv2.VideoCapture(input_path)

    if not cap.isOpened():
        app.logger.error(f"Error opening video file {file_name}")
        return

    frame_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    frame_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = int(cap.get(cv2.CAP_PROP_FPS))

    output_video = cv2.VideoWriter(output_path, cv2.VideoWriter_fourcc(*'mp4v'), fps, (frame_width, frame_height))

    left_stage = ''
    right_stage = ''
    left_counter = 0
    right_counter = 0
    prev_left_elbow_angle = None
    prev_right_elbow_angle = None

    feedback_display_counter = 0

    with mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5) as pose:
        while cap.isOpened():
            ret, frame = cap.read()

            feedback_display_counter -= 1

            if not ret:
                break

            image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

            results = pose.process(image)

            try:
                landmarks = results.pose_landmarks.landmark

                left_elbow_angle = calculate_angles(landmarks, 'LEFT')
                right_elbow_angle = calculate_angles(landmarks, 'RIGHT')

                left_stage, feedback_display_counter, left_counter = update_stage_and_feedback(left_counter,
                                                                                               feedback_display_counter,
                                                                                               prev_left_elbow_angle,
                                                                                               left_elbow_angle,
                                                                                               left_stage)
                right_stage, feedback_display_counter, right_counter = update_stage_and_feedback(right_counter,
                                                                                                 feedback_display_counter,
                                                                                                 prev_right_elbow_angle,
                                                                                                 right_elbow_angle,
                                                                                                 right_stage)
                prev_left_elbow_angle = left_elbow_angle
                prev_right_elbow_angle = right_elbow_angle

            except Exception as e:
                app.logger.error(f"Exception: {e}")

            feedback = '' if feedback_display_counter <= 0 else '팔을 안으로 더 굽혀주세요.'
            if feedback:
                image = put_text_utf8(image, feedback, (50, frame_height - 100), font_path)

            image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
            output_video.write(image)

    cap.release()
    output_video.release()
    cv2.destroyAllWindows()

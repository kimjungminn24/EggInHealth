import os
import cv2
import mediapipe as mp

from flask import Flask, current_app
from app.util.drawing_util import put_text_utf8
from app.util.landmark_utils import calculate_angle

app = Flask(__name__)

mp_pose = mp.solutions.pose
mp_drawing = mp.solutions.drawing_utils


def get_landmarks_coordinates(landmarks, side):
    points = ['SHOULDER', 'HIP', 'KNEE', 'ANKLE']
    return [
        [landmarks[getattr(mp_pose.PoseLandmark, f'{side}_{point}').value].x,
         landmarks[getattr(mp_pose.PoseLandmark, f'{side}_{point}').value].y]
        for point in points
    ]


def calculate_angles(landmarks, side):
    shoulder, hip, knee, ankle = get_landmarks_coordinates(landmarks, side.upper())

    hip_angle = calculate_angle(shoulder, hip, knee)
    knee_angle = calculate_angle(hip, knee, ankle)

    return hip_angle, knee_angle


def update_stage_and_feedback(counter, feedback_counter, prev_knee_angle, prev_hip_angle, knee_angle, hip_angle, stage):
    curr_stage = stage

    if prev_knee_angle is not None and prev_hip_angle is not None:
        if prev_knee_angle < knee_angle and prev_hip_angle < hip_angle:
            curr_stage = 'up'
        elif prev_knee_angle > knee_angle and prev_hip_angle > hip_angle:
            curr_stage = 'down'

        if stage == 'down' and curr_stage == 'up':
            counter += 1
            if hip_angle > 90 and knee_angle > 90:
                feedback_counter = 50

    return curr_stage, feedback_counter, counter


def detect(file_name):
    input_path = os.path.join(current_app.config['UPLOAD_FOLDER'], file_name)
    output_path = os.path.join(current_app.config['OUTPUT_FOLDER'], file_name)
    font_path = os.path.join(current_app.config['FONT_FILE_FOLDER'], 'Pretendard-Medium.ttf')

    cap = cv2.VideoCapture(input_path)

    if not cap.isOpened():
        app.logger.error("Error opening video file {file_name}")
        return

    frame_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    frame_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = int(cap.get(cv2.CAP_PROP_FPS))

    output_video = cv2.VideoWriter(output_path, cv2.VideoWriter_fourcc(*'mp4v'), fps, (frame_width, frame_height))

    stage = ''
    counter = 0
    prev_hip_angle = None
    prev_knee_angle = None

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

                hip_angle, knee_angle = calculate_angles(landmarks, 'LEFT')
                stage, feedback_display_counter, counter = update_stage_and_feedback(counter, feedback_display_counter,
                                                                                     prev_knee_angle,
                                                                                     prev_hip_angle,
                                                                                     knee_angle, hip_angle, stage)

                prev_knee_angle = knee_angle
                prev_hip_angle = hip_angle
            except Exception as e:
                app.logger.error(f"Exception: {e}")

            feedback = '' if feedback_display_counter <= 0 else '허벅지가 지면과 평행하게 유지되도록 깊이 앉아주세요.'
            if feedback:
                image = put_text_utf8(image, feedback, (50, frame_height - 100), font_path)

            image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
            output_video.write(image)

    cap.release()
    output_video.release()
    cv2.destroyAllWindows()

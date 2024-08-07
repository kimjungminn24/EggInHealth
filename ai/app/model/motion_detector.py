import os

import cv2
import app.model.processors.squat_frame_processor as squat_frame_processor
import app.model.thresholds as thresholds
import app.util.landmark_utils as landmark_utils

from flask import Flask, current_app

app = Flask(__name__)


def detect(file_name):
    input_path = str(os.path.join(current_app.config['UPLOAD_FOLDER'], file_name))
    output_path = str(os.path.join(current_app.config['OUTPUT_FOLDER'], file_name))

    cap = cv2.VideoCapture(input_path)
    pose = landmark_utils.get_mediapipe_pose()
    threshold = thresholds.get_squat_threshold()

    upload_process_frame = squat_frame_processor.ProcessFrame(thresholds=threshold)

    fps = int(cap.get(cv2.CAP_PROP_FPS))
    frame_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    frame_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

    video_output = cv2.VideoWriter(output_path, cv2.VideoWriter.fourcc(*'mp4v'), fps, (frame_width, frame_height))

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
        frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        out_frame, _ = upload_process_frame.process(frame, pose)
        frame = cv2.cvtColor(out_frame, cv2.COLOR_RGB2BGR)
        video_output.write(frame)

    cap.release()
    video_output.release()
    cv2.destroyAllWindows()

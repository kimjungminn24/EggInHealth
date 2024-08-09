import mediapipe as mp
import numpy as np

mp_pose = mp.solutions.pose
mp_drawing = mp.solutions.drawing_utils


def get_mediapipe_pose(
        static_image_mode=False,
        model_complexity=1,
        smooth_landmarks=True,
        min_detection_confidence=0.5,
        min_tracking_confidence=0.5
):
    pose = mp_pose.Pose(
        static_image_mode=static_image_mode,
        model_complexity=model_complexity,
        smooth_landmarks=smooth_landmarks,
        min_detection_confidence=min_detection_confidence,
        min_tracking_confidence=min_tracking_confidence
    )
    return pose


def calculate_angle(a, b, c):
    a = np.array(a)
    b = np.array(b)
    c = np.array(c)

    radians = np.arctan2(c[1] - b[1], c[0] - b[0]) - np.arctan2(a[1] - b[1], a[0] - b[0])
    angle = np.abs(radians * 180.0 / np.pi)

    if angle > 180.0:
        angle = 360 - angle

    return angle


def get_landmark_coordinates(landmarks, side, pose_landmark):
    return [
        landmarks[pose_landmark[f'{side}_SHOULDER']].x, landmarks[pose_landmark[f'{side}_SHOULDER']].y,
        landmarks[pose_landmark[f'{side}_HIP']].x, landmarks[pose_landmark[f'{side}_HIP']].y,
        landmarks[pose_landmark[f'{side}_KNEE']].x, landmarks[pose_landmark[f'{side}_KNEE']].y,
        landmarks[pose_landmark[f'{side}_ANKLE']].x, landmarks[pose_landmark[f'{side}_ANKLE']].y,
    ]


def get_squat_angle(landmarks, direction='left'):
    side = 'LEFT' if direction == 'left' else 'RIGHT'

    shoulder, hip, knee, ankle = get_landmark_coordinates(landmarks, side, mp_pose.PoseLandmark)

    coord_dict = {
        'shoulder': shoulder,
        'hip': hip,
        'knee': knee,
        'ankle': ankle,
        'hip_angle': calculate_angle(shoulder, hip, knee),
        'knee_angle': calculate_angle(hip, knee, ankle)
    }

    return coord_dict

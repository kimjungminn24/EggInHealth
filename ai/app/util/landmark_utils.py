import mediapipe as mp
import numpy as np


def get_mediapipe_pose(
        static_image_mode=False,
        model_complexity=1,
        smooth_landmarks=True,
        min_detection_confidence=0.5,
        min_tracking_confidence=0.5
):
    pose = mp.solutions.pose.Pose(
        static_image_mode=static_image_mode,
        model_complexity=model_complexity,
        smooth_landmarks=smooth_landmarks,
        min_detection_confidence=min_detection_confidence,
        min_tracking_confidence=min_tracking_confidence
    )
    return pose


def get_landmark_array(pose_landmark, key, frame_width, frame_height):
    denorm_x = int(pose_landmark[key].x * frame_width)
    denorm_y = int(pose_landmark[key].y * frame_height)

    return np.array([denorm_x, denorm_y])


def find_angle(p1, p2, ref_pt=np.array([0, 0])):
    p1_ref = p1 - ref_pt
    p2_ref = p2 - ref_pt

    cos_theta = (np.dot(p1_ref, p2_ref)) / (1.0 * np.linalg.norm(p1_ref) * np.linalg.norm(p2_ref))
    theta = np.arccos(np.clip(cos_theta, -1.0, 1.0))

    degree = int(180 / np.pi) * theta

    return int(degree)


def get_landmark_features(kp_results, dict_features, feature, frame_width, frame_height):
    if feature == 'nose':
        return get_landmark_array(kp_results, dict_features[feature], frame_width, frame_height)

    elif feature == 'left' or feature == 'right':
        shldr_coord = get_landmark_array(kp_results, dict_features[feature]['shoulder'], frame_width, frame_height)
        elbow_coord = get_landmark_array(kp_results, dict_features[feature]['elbow'], frame_width, frame_height)
        wrist_coord = get_landmark_array(kp_results, dict_features[feature]['wrist'], frame_width, frame_height)
        hip_coord = get_landmark_array(kp_results, dict_features[feature]['hip'], frame_width, frame_height)
        knee_coord = get_landmark_array(kp_results, dict_features[feature]['knee'], frame_width, frame_height)
        ankle_coord = get_landmark_array(kp_results, dict_features[feature]['ankle'], frame_width, frame_height)
        foot_coord = get_landmark_array(kp_results, dict_features[feature]['foot'], frame_width, frame_height)

        return shldr_coord, elbow_coord, wrist_coord, hip_coord, knee_coord, ankle_coord, foot_coord

    else:
        raise ValueError("feature needs to be either 'nose', 'left' or 'right")

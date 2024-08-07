def get_squat_threshold():
    _ANGLE_HIP_KNEE_VERT = {
        'NORMAL': (0, 32),
        'TRANS': (35, 65),
        'PASS': (70, 95)
    }

    thresholds = {
        'HIP_KNEE_VERT': _ANGLE_HIP_KNEE_VERT,

        'HIP_THRESH': [10, 50],
        'ANKLE_THRESH': 45,
        'KNEE_THRESH': [50, 70, 95],

        'OFFSET_THRESH': 35.0,
        'INACTIVE_THRESH': 15.0,

        'CNT_FRAME_THRESH': 50
    }

    return thresholds


def get_deadlift_threshold():
    _ANGLE_HIP_KNEE_VERT = {
        'NORMAL': (0, 40),
        'TRANS': (45, 75),
        'PASS': (80, 100)
    }

    thresholds = {
        'HIP_KNEE_VERT': _ANGLE_HIP_KNEE_VERT,

        'HIP_THRESH': [10, 70],
        'ANKLE_THRESH': 30,
        'KNEE_THRESH': [50, 75, 100],

        'OFFSET_THRESH': 30.0,
        'INACTIVE_THRESH': 10.0,

        'CNT_FRAME_THRESH': 50,

        'BACK_ANGLE_THRESH': [10, 60],
        'SHOULDER_POSITION_THRESH': [20, 50]
    }

    return thresholds

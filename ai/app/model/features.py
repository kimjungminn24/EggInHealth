COLORS = {
    'blue': (0, 127, 255),
    'red': (255, 50, 50),
    'green': (0, 255, 127),
    'light_green': (100, 233, 127),
    'yellow': (255, 255, 0),
    'magenta': (255, 0, 255),
    'white': (255, 255, 255),
    'cyan': (0, 255, 255),
    'light_blue': (102, 204, 255)
}

left_features = {
    'shoulder': 11,
    'elbow': 13,
    'wrist': 15,
    'hip': 23,
    'knee': 25,
    'ankle': 27,
    'foot': 31
}

right_features = {
    'shoulder': 12,
    'elbow': 14,
    'wrist': 16,
    'hip': 24,
    'knee': 26,
    'ankle': 28,
    'foot': 32
}


def get_colors():
    return COLORS


def get_dict_features():
    return {
        'left': left_features,
        'right': right_features,
        'nose': 0
    }

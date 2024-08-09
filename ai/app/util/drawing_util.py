import cv2
import os
import numpy as np
from PIL import Image, ImageDraw, ImageFont
from flask import current_app


def put_text_utf8(image, text, position,
                  font_path=os.path.join(current_app.config['FONT_FOLDER'], 'Pretendard-Medium.ttf'), font_size=30,
                  color=(255, 255, 255), bg_color=(0, 0, 0),
                  padding=10):
    image_pil = Image.fromarray(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))

    font = ImageFont.truetype(font_path, font_size)
    draw = ImageDraw.Draw(image_pil)

    text_bbox = draw.textbbox((0, 0), text, font=font)
    text_width = text_bbox[2] - text_bbox[0]
    text_height = text_bbox[3] - text_bbox[1]

    background_position = (
        position[0] - padding,
        position[1] - padding,
        position[0] + text_width + padding,
        position[1] + text_height + padding + 10
    )

    draw.rectangle(background_position, fill=bg_color)
    draw.text(position, text, font=font, fill=color)

    image = cv2.cvtColor(np.array(image_pil), cv2.COLOR_RGBA2BGR)
    return image

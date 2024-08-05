import os

from flask import jsonify, request, Blueprint, current_app
from werkzeug.utils import secure_filename

video_bp = Blueprint('video_api', __name__)


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in {'mp4'}


@video_bp.route('/upload', methods=['POST'])
def upload_video():
    if 'file' not in request.files:
        return jsonify({'error': 'No file found'}), 400
    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        print(os.path.join(current_app.config['UPLOAD_FOLDER'], filename))
        file.save(os.path.join(current_app.config['UPLOAD_FOLDER'], filename))
        return jsonify({'result': 'File uploaded successfully', 'filename': filename}), 201
    return jsonify({'error': 'Invalid file type'}), 400

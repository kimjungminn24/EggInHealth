import os

from flask import jsonify, request, Blueprint, current_app, send_from_directory
from werkzeug.utils import secure_filename

from app.model.motion_detector import detect

video_bp = Blueprint('video_api', __name__)


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in {'mp4'}


@video_bp.route('/ai/feedback', methods=['POST'])
def upload_video():
    if 'file' not in request.files:
        return jsonify({'error': 'No file found'}), 400
    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    mode = request.args.get('mode')

    if file and allowed_file(file.filename):
        file_name = secure_filename(file.filename)
        file.save(os.path.join(current_app.config['UPLOAD_FOLDER'], file_name))
        detect(file_name, mode)
        return send_from_directory(current_app.config['OUTPUT_FOLDER'], file_name, as_attachment=True)
    return jsonify({'error': 'Invalid file type'}), 400

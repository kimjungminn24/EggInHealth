import uuid
import os

from flask import jsonify, request, Blueprint, current_app, send_from_directory
from werkzeug.utils import secure_filename

from app.model.motion_detector import detect

video_bp = Blueprint('video_api', __name__)


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in {'mp4'}


@video_bp.route('/ai/feedback', methods=['POST'])
def upload_video():
    mode = request.form.get('mode')
    if not mode:
        return jsonify({'error': 'No mode selected'}), 400

    if 'file' not in request.files:
        return jsonify({'error': 'No file found'}), 400
    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    if file and allowed_file(file.filename):
        file_name = str(uuid.uuid4()) + "_" + secure_filename(file.filename)
        upload_path = os.path.join(current_app.config['UPLOAD_FOLDER'], file_name)
        file.save(upload_path)
        detect(file_name, 1)
        os.remove(upload_path)
        return send_from_directory(current_app.config['OUTPUT_FOLDER'], file_name, as_attachment=True)
    return jsonify({'error': 'Invalid file type'}), 400

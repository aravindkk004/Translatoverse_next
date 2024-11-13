from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from werkzeug.utils import secure_filename
from deep_translator import GoogleTranslator
import os
import PyPDF2

# Blueprint for PDF translation
pdf_translate_bp = Blueprint('pdf_translate', __name__)

# Configuration for file uploads
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'pdf'}

# Ensure the upload folder exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Function to check if the file type is allowed
def allowed_file(filename, allowed_extensions):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in allowed_extensions

# Function to extract text from a PDF file
def extract_text_from_pdf(pdf_path):
    with open(pdf_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        text = ''
        for page in reader.pages:
            text += page.extract_text()
    return text.strip()

# Function to translate text using GoogleTranslator
def translate(text, target_lang):
    if text:
        translated = GoogleTranslator(source='auto', target=target_lang).translate(text)
        return translated
    return None

# Route for PDF translation
@pdf_translate_bp.route('/pdf_translate', methods=['POST'])
def pdfTranslate():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file and allowed_file(file.filename, ALLOWED_EXTENSIONS):
        filename = secure_filename(file.filename)
        file_path = os.path.join(UPLOAD_FOLDER, filename)
        file.save(file_path)

        extracted_text = extract_text_from_pdf(file_path)
        destination_language = request.form.get('target_language', 'en')  # Get the target language
        translated_text = translate(extracted_text, destination_language)

        # Log translation history (optional, can be removed if not needed)
        print(f"Translation logged: File type: PDF, Target language: {destination_language}")

        # Delete the uploaded file after translation to save space
        os.remove(file_path)

        return jsonify({'translated_text': translated_text}), 200

    else:
        return jsonify({'error': 'File type not allowed'}), 400

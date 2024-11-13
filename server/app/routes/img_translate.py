from flask import Blueprint, request, jsonify
from deep_translator import GoogleTranslator
import os
import cv2
import pytesseract
from werkzeug.utils import secure_filename

# Blueprint for image translation
img_translate_bp = Blueprint('img_translate', __name__)

# Configuration for file uploads
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

# Ensure the upload folder exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Function to check if the file type is allowed
def allowed_file(filename, allowed_extensions):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in allowed_extensions

# Function to preprocess an image for better OCR accuracy
def preprocess_image(image):
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    _, binary_image = cv2.threshold(gray_image, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    return binary_image

# Function to extract text from an image using Tesseract OCR
def extract_text(image):
    resized_image = cv2.resize(image, None, fx=2, fy=2, interpolation=cv2.INTER_CUBIC)
    processed_image = preprocess_image(resized_image)
    extracted_text = pytesseract.image_to_string(processed_image)
    return extracted_text.strip()

# Function to translate text using GoogleTranslator
def translate(text, target_lang):
    if text:
        translated = GoogleTranslator(source='auto', target=target_lang).translate(text)
        return translated
    return None

# Function to log translation history (placeholder for actual implementation)
def log_translation_history(file_type, destination_language, input_text, translated_text, token):
    # This function should store logs in a database or file
    print(f"Translation logged: {file_type}, {destination_language}, {input_text}, {translated_text}, {token}")

# Route for image translation
@img_translate_bp.route('/img_translate', methods=['POST'])
def imgTranslate():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file and allowed_file(file.filename, ALLOWED_EXTENSIONS):
        filename = secure_filename(file.filename)
        image_path = os.path.join(UPLOAD_FOLDER, filename)
        file.save(image_path)

        # Read and process the image
        image = cv2.imread(image_path)
        extracted_text = extract_text(image)

        # Get the target language from the form data
        target_language = request.form.get('target_language', 'en')

        # Translate the extracted text
        translated_text = translate(extracted_text, target_language)

        # Log the translation history
        token = request.form.get('token', '')  # Retrieve token if provided
        log_translation_history('Image', target_language, extracted_text, translated_text, token)
        os.remove(image_path)
        return jsonify({'translated_text': translated_text})

    else:
        return jsonify({'error': 'File type not allowed'}), 400

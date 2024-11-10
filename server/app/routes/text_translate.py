# app/routes/translate.py

from flask import Blueprint, request, jsonify
from deep_translator import GoogleTranslator

# Define the Blueprint with the name 'text_translate'
text_translate_bp = Blueprint('text_translate', __name__)

# Example route for translating text
@text_translate_bp.route('/text_translate', methods=['POST'])
def translate_text():
    data = request.get_json()  # Assuming you're sending JSON data
    text = data.get('text')  # Get the text from the request body
    target_language = data.get('target_language')

    if not text or not target_language:
        return jsonify({"error": "Text and target_language are required"}), 400
    # Example translation using GoogleTranslator
    if text:
        translated = GoogleTranslator(source='auto', target=target_language).translate(text)
        print(translated)
        return jsonify({'translated_text': translated})
    else:
        return jsonify({'error': 'No text provided'}), 400

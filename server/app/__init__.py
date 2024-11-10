from flask import Flask
from flask_cors import CORS
from .routes.text_translate import text_translate_bp  # Import the text_translate blueprint

def create_app():
    app = Flask(__name__)
    
    # Enable CORS for the app
    CORS(app)
    
    # Register the blueprint
    app.register_blueprint(text_translate_bp, url_prefix='/api')
    
    return app



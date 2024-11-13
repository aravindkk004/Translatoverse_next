from flask import Flask
from flask_cors import CORS
from .routes.text_translate import text_translate_bp
from .routes.img_translate import img_translate_bp
from .routes.pdf_translate import pdf_translate_bp
from .routes.voice_translate import voice_translate_bp

def create_app():
    app = Flask(__name__)
    
    # Enable CORS for the app
    CORS(app)
    
    # Register the blueprint
    app.register_blueprint(text_translate_bp, url_prefix='/api')
    app.register_blueprint(img_translate_bp, url_prefix="/api")
    app.register_blueprint(pdf_translate_bp, url_prefix="/api")
    app.register_blueprint(voice_translate_bp, url_prefix="/api")
    
    return app



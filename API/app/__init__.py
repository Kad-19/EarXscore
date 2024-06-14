# py script to intialize flask and configure sqlalchemy

from flask import Flask
from flask_migrate import Migrate
from .routes import auth_bp
from .models import db

def create_app():
    app = Flask(__name__)
    
    # Configurations for SQLAlchemy
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://earuser:1199@localhost/earhealth'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)
    # Initialize Flask-Migrate
    migrate = Migrate(app, db)
    
    # Register blueprints
    app.register_blueprint(auth_bp, url_prefix='/auth')

    return app

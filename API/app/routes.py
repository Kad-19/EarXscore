# APIs to handle any route comes in

from flask import Blueprint, request, jsonify
from app.models import db, User
from flask_cors import CORS

auth_bp = Blueprint('auth', __name__)
CORS(auth_bp)

@auth_bp.route('/register', methods=['POST'], strict_slashes=False)
def register():
    from . import bcrypt
    username = request.json.get('username')
    email = request.json.get('email')
    password = request.json.get('password')

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    if not username or not email or not password:
        return jsonify({'error': 'Missing username, email, or password'}), 400

    existing_user = User.query.filter_by(username=username).first()
    if existing_user:
        return jsonify({'error': 'Username already exists'}), 400

    new_user = User(username=username, email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201

# Helper function to authenticate user


def authenticate_user(email, password):
    from . import bcrypt
    user = User.query.filter_by(email=email).first()
    if user and bcrypt.check_password_hash(user.password, password):
        return user
    return None

@auth_bp.route('/login', methods=['POST'], strict_slashes=False)
def login():
    email = request.json.get('email')
    password = request.json.get('password')

    if not email or not password:
        return jsonify({'error': 'Missing email or password'}), 400
    
    user = authenticate_user(email, password)

    if user:
        return jsonify({'user': user.username, 'id': user.id, 'email': user.email}), 200
    else:
        return jsonify({'error': 'Invalid email or password'}), 401
# APIs to handle any route comes in

from flask import Blueprint, request, jsonify
from app.models import db, User

auth_bp = Blueprint('auth', __name__)

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


def authenticate_user(username, password):
    from . import bcrypt
    user = User.query.filter_by(username=username).first()
    if user and bcrypt.check_password_hash(user.password, password):
        return user
    return None

@auth_bp.route('/login', methods=['POST'], strict_slashes=False)
def login():
    username = request.json.get('username')
    password = request.json.get('password')

    if not username or not password:
        return jsonify({'error': 'Missing username or password'}), 400
    
    user = authenticate_user(username, password)

    if user:
        return jsonify({'user': user.username, 'id': user.id}), 200
    else:
        return jsonify({'error': 'Invalid username or password'}), 401
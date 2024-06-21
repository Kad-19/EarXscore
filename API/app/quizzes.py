import json
from datetime import datetime, timedelta
from flask import Blueprint, request, jsonify, url_for, current_app
from app.models import db, User, Quiz
from flask_cors import CORS
from flask_mail import Mail, Message
import random, string

quiz_bp = Blueprint('quiz', __name__)
CORS(quiz_bp)
mail = Mail()

# Load quiz data from JSON file
def load_quiz_data(difficulty):
    if difficulty == "easy":
        with open('easyquiz.json', 'r') as f:
            quiz_data = json.load(f)
            questions = quiz_data['quiz']['questions']
            random.shuffle(questions)  # Shuffle the list of questions
            quiz_data['quiz']['questions'] = questions  # Update shuffled questions in quiz_data
        return quiz_data
    elif difficulty == "medium":
        with open('medquiz.json', 'r') as f:
            quiz_data = json.load(f)
            questions = quiz_data['quiz']['questions']
            random.shuffle(questions)  # Shuffle the list of questions
            quiz_data['quiz']['questions'] = questions  # Update shuffled questions in quiz_data
        return quiz_data
    elif difficulty == "hard":
        with open('hardquiz.json', 'r') as f:
            quiz_data = json.load(f)
            questions = quiz_data['quiz']['questions']
            random.shuffle(questions)  # Shuffle the list of questions
            quiz_data['quiz']['questions'] = questions  # Update shuffled questions in quiz_data
        return quiz_data

def check_eligibility(user_id, difficulty):
    # If the user already exists, check their eligibility based on the difficulty
    if difficulty == 'easy':
        return True
    elif difficulty == 'medium':
        easy_quiz = Quiz.query.filter_by(user_id=user_id, difficulty='easy').first()
        if easy_quiz.score == 10:
            return True
    elif difficulty == 'hard':
        medium_quiz = Quiz.query.filter_by(user_id=user_id, difficulty='medium').first()
        if medium_quiz:
            if medium_quiz.score == 10:
                return True
    return "Invalid difficulty"


# Endpoint to fetch quiz data
@quiz_bp.route('/quiz', methods=['POST', 'GET'], strict_slashes=False)
def get_quiz():
    id = request.json.get('id')
    difficulty = request.json.get('difficulty')
    
    user_quizzes = Quiz.query.filter_by(user_id=id).all()
    
    if not user_quizzes:
        # If the user is new, add them with an initial entry for 'easy' difficulty
        new_quiz = Quiz(user_id=id, difficulty='easy', score=0)
        db.session.add(new_quiz)
        db.session.commit()
        
        if difficulty == "easy":
            quiz_data = load_quiz_data(difficulty)
            return jsonify(quiz_data)
        # For a new user, only allow 'easy' difficulty
        return "First time to quiz, You have to play Easy"
    
    elif user_quizzes:
        if difficulty == 'easy':
            quiz_data = load_quiz_data(difficulty)
            return jsonify(quiz_data)
    
        elif difficulty == 'medium':
            check = check_eligibility(id, difficulty)
        
            if check is True:
                quiz_data = load_quiz_data(difficulty)
                return jsonify(quiz_data)
            else:
                return jsonify({'error': f'You need to score 10/10 in the previous level to access {difficulty} quiz.'}), 403
        elif difficulty == 'hard':
            check = check_eligibility(id, difficulty)
        
            if check is True:
                quiz_data = load_quiz_data(difficulty)
                return jsonify(quiz_data)
            else:
                return jsonify({'error': f'You need to score 10/10 in the previous level to access {difficulty} quiz.'}), 403
        else:
            return jsonify({'Error': 'Wrong difficulty'})
    else:
        return jsonify("Invalid"), 400

# Load quiz data from JSON file
def get_questions(difficulty):
    if difficulty == "easy":
        with open('easyquiz.json', 'r') as f:
            quiz_data = json.load(f)
            questions = quiz_data['quiz']['questions']
        return questions
    elif difficulty == "medium":
        with open('medquiz.json', 'r') as f:
            quiz_data = json.load(f)
            questions = quiz_data['quiz']['questions']
        return questions
    elif difficulty == "hard":
        with open('hardquiz.json', 'r') as f:
            quiz_data = json.load(f)
            questions = quiz_data['quiz']['questions']
        return questions
    return "Wrong Diffculty"


def calculate_score(difficulty, user_answers):

    if not user_answers and not difficulty:
        return jsonify({'error': 'No answers provided'}), 400

    questions = get_questions(difficulty)
    score = 0

    for user_answer in user_answers:
        id = user_answer.get('id')
        answer = user_answer.get('answer')

        for question in questions:
            if id == question['id']:  # Accessing question properties correctly
                if answer == question['correctAnswer']:  # Accessing the correct answer property
                    score += 1  # Increment the score for correct answers
                break  # Exit the inner loop once the question is found

    return score

@quiz_bp.route('/quiz/submit', methods=['POST'])
def submit_quiz():
    data = request.json
    user_id = data.get('id')
    difficulty = data.get('difficulty')
    answers = data.get('answers')

    score = calculate_score(difficulty, answers) 

    quiz = Quiz.query.filter_by(user_id=user_id, difficulty=difficulty).first()
    if quiz:
        quiz.score = score
    else:
        quiz = Quiz(user_id=user_id, difficulty=difficulty, score=score)
        db.session.add(quiz)
    db.session.commit()

    return jsonify({'message': f'Score for {difficulty} quiz submitted successfully.'}), 200

#If possible we recommend using headphones which provide more accurate results and tests your right and left ears individually.
#Adjust the volume of your device to a comfortable level.
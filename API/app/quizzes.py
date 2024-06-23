import json
from flask import Blueprint, request, jsonify
from app.models import db, Quiz
from flask_cors import CORS
import random, os, base64

quiz_bp = Blueprint('quiz', __name__)
CORS(quiz_bp)

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

def encode_audio_files(questions):
    for question in questions:
        if question["type"] == "audio":
            file_path = os.path.join('audio', question["audio"])
            with open(file_path, "rb") as audio_file:
                encoded_string = base64.b64encode(audio_file.read()).decode('utf-8')
                question["audioData"] = encoded_string


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
            encode_audio_files(quiz_data["quiz"]["questions"])
            return jsonify(quiz_data)
        # For a new user, only allow 'easy' difficulty
        return "First time to quiz, You have to play Easy"
    
    elif user_quizzes:
        if difficulty == 'easy':
            quiz_data = load_quiz_data(difficulty)
            encode_audio_files(quiz_data["quiz"]["questions"])
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

@quiz_bp.route('/quiz/score', methods=['GET', 'POST'])
def score_quiz():
    data = request.json
    user_id = data.get('id')
    difficulty = data.get('difficulty')

    user = Quiz.query.filter_by(user_id=user_id, difficulty=difficulty).first()
    if user.score == 10:
        return jsonify({'message': f'Congratulation, Your Score is {user.score} out of 10, Well Done For Making it to the Next Level.'}), 200
    else:
        return jsonify({'message': f'Your Score is {user.score} Out of 10, Sorry, You Didn\'t Passed to the Next Level, You can come back and Try Again.'}), 200
    
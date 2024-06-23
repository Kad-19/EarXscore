import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const quiz = {
  quiz: {
    name: "Sample Quiz",
    questions: [
      {
        id: 1,
        audio: "audio1.mp3",
        question: "What is the capital of France?",
        correctAnswer: "Paris",
      },
      {
        id: 2,
        audio: "audio2.mp3",
        question: "What is 2 + 2?",
        correctAnswer: "4",
      },
      {
        id: 3,
        audio: "audio3.mp3",
        question: "What is the chemical symbol for water?",
        correctAnswer: "H2O",
      },
      {
        id: 4,
        audio: "audio4.mp3",
        question: "Who wrote 'To Kill a Mockingbird'?",
        correctAnswer: "Harper Lee",
      },
      {
        id: 5,
        audio: "audio5.mp3",
        question: "What is the largest planet in our solar system?",
        correctAnswer: "Jupiter",
      },
      {
        id: 6,
        audio: "audio6.mp3",
        question: "What is the square root of 64?",
        correctAnswer: "8",
      },
      {
        id: 7,
        audio: "audio7.mp3",
        question: "What is the boiling point of water in Celsius?",
        correctAnswer: "100",
      },
      {
        id: 8,
        audio: "audio8.mp3",
        question: "Who painted the Mona Lisa?",
        correctAnswer: "Leonardo da Vinci",
      },
      {
        id: 9,
        audio: "audio9.mp3",
        question: "What is the fastest land animal?",
        correctAnswer: "Cheetah",
      },
      {
        id: 10,
        audio: "audio10.mp3",
        question: "What is the smallest prime number?",
        correctAnswer: "2",
      },
    ],
  },
};


const Quizz = () => {
  let {difficulty} = useParams();

  const [questionData, setQuestionData] = useState({
    id: quiz.quiz.questions[0].id,
    title: quiz.quiz.questions[0].question,
    correctAnswer: quiz.quiz.questions[0].correctAnswer,
    num: 1,
  });

  const [answers, setAnswers] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(null);
  const [timeLeft, setTimeLeft] = useState(300); 

  const { id, title, correctAnswer, num } = questionData;

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      handleSubmitQuiz();
    }
  }, [timeLeft]);

  const handleAnswerChange = (e) => {
    setCurrentAnswer(e.target.value);
  };

  const handleSubmit = () => {
    if (currentAnswer.trim() === "") {
      alert("Answer cannot be empty");
      return;
    }

    const newAnswer = {
      id,
      answer: currentAnswer,
    };

    setAnswers([...answers, newAnswer]);
    setIsSubmitted(true);
    setFeedback(currentAnswer === correctAnswer ? "Correct" : "Wrong");
  };

  const handleNextQuestion = () => {
    const nextNum = num + 1;
    setQuestionData({
      id: quiz.quiz.questions[nextNum - 1].id,
      title: quiz.quiz.questions[nextNum - 1].question,
      correctAnswer: quiz.quiz.questions[nextNum - 1].correctAnswer,
      num: nextNum,
    });
    setCurrentAnswer("");
    setIsSubmitted(false);
    setFeedback("");
  };

  const handleSubmitQuiz = () => {
    const totalScore = answers.reduce((score, answer) => {
      const question = quiz.quiz.questions.find(q => q.id === answer.id);
      if (question && question.correctAnswer === answer.answer) {
        return score + 1;
      }
      return score;
    }, 0);

    setScore(totalScore);
    console.log(answers);
  };

  const formattedTime = `${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(2, '0')}`;

  const fetchQuizzes = async () => {
    
    try{
      const res = await axios.get(
        `${API_URL}/quiz`,
      );
    }catch (err){
      console.log(err);
    }
  };

  return (
    <div className="flex gap-6 mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
      {score === null ? (
        <div>
          <div>
            <p>Question {num} of 10</p>
            <p>Time remaining: {formattedTime}</p>
          </div>
          <div>
            <p>{title}</p>
            <button>Play Audio</button>
            <hr />
            <p>Answer</p>
            <input 
              className="bg-white" 
              value={currentAnswer} 
              onChange={handleAnswerChange} 
              disabled={isSubmitted}
            />
            <button onClick={handleSubmit} disabled={isSubmitted}>Submit</button>
            {feedback && <p>{feedback}</p>}
            <div className="my-2 flex gap-2">
              {num < 10 ? (
                <button onClick={handleNextQuestion} disabled={!isSubmitted}>Next</button>
              ) : (
                <button onClick={handleSubmitQuiz} disabled={!isSubmitted}>Submit Quiz</button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h1>Your Score: {score} out of 10</h1>
          {score < 6 ? <p>You are deaf. Don't even bother going to hospital </p> :""}
        </div>
      )}
    </div>
  );
};

export default Quizz;

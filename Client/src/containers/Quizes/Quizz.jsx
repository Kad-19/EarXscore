import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import API_URL from "@/url";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AudioPlayer from "./AudioPlayer";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Quizz = ({ user, error, isAuthenticated }) => {
  const navigate = useNavigate();
  let { difficulty } = useParams();

  const [quiz, setQuiz] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [questionData, setQuestionData] = useState({
    id: "",
    title: "",
    correctAnswer: "",
    num: 1,
    type: "",
    audioData: "",
  });
  useEffect(() => {
    fetchQuizzes();
  }, []);
  useEffect(() => {
    if (quiz) {
      if (quiz.quiz.questions[0].type == "text") {
        setQuestionData({
          id: quiz.quiz.questions[0].id,
          title: quiz.quiz.questions[0].question,
          correctAnswer: quiz.quiz.questions[0].correctAnswer,
          num: 1,
          type: quiz.quiz.questions[0].type,
          audioData: "",
        });
      } else {
        setQuestionData({
          id: quiz.quiz.questions[0].id,
          title: quiz.quiz.questions[0].question,
          correctAnswer: quiz.quiz.questions[0].correctAnswer,
          num: 1,
          type: quiz.quiz.questions[0].type,
          audioData: quiz.quiz.questions[0].audioData,
        });
      }
    }
  }, [quiz]);

  const { id, title, correctAnswer, num, type, audioData } = questionData;

  const [answers, setAnswers] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(null);
  const [timeLeft, setTimeLeft] = useState(300);
  const [scoreMessage, setScoreMessage] = useState(null);

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

  const handleSubmit = (e) => {
    e.preventDefault();
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
    if (quiz.quiz.questions[nextNum - 1].type == "text") {
      setQuestionData({
        id: quiz.quiz.questions[nextNum - 1].id,
        title: quiz.quiz.questions[nextNum - 1].question,
        correctAnswer: quiz.quiz.questions[nextNum - 1].correctAnswer,
        num: nextNum,
        type: quiz.quiz.questions[nextNum - 1].type,
        audioData: "",
      });
    } else {
      setQuestionData({
        id: quiz.quiz.questions[nextNum - 1].id,
        title: quiz.quiz.questions[nextNum - 1].question,
        correctAnswer: quiz.quiz.questions[nextNum - 1].correctAnswer,
        num: nextNum,
        type: quiz.quiz.questions[nextNum - 1].type,
        audioData: quiz.quiz.questions[nextNum - 1].audioData,
      });
    }
    setCurrentAnswer("");
    setIsSubmitted(false);
    setFeedback("");
  };

  const handleSubmitQuiz = async () => {
    const totalScore = answers.reduce((score, answer) => {
      const question = quiz.quiz.questions.find((q) => q.id === answer.id);
      if (question && question.correctAnswer === answer.answer) {
        return score + 1;
      }
      return score;
    }, 0);

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const id = localStorage.getItem("id");

    const body = JSON.stringify({ id, difficulty, answers });
    console.log(body);

    try {
      const res = await axios.post(`${API_URL}/quiz/submit`, body, config);
      console.log(res);
      navigate(`/score/${totalScore}`);
    } catch (err) {
      console.log(err);
      setErrorMessage(err.response.data.error);
    }
  };

  const fetchScore = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const id = localStorage.getItem("id");

    const body = JSON.stringify({ id, difficulty });

    try {
      const res = await axios.post(`${API_URL}/quiz/score`, body, config);
      console.log(res);
      setScoreMessage(res.data.message);
    } catch (err) {
      console.log(err);
      setErrorMessage(err.response.data.error);
    }
  };

  const formattedTime = `${Math.floor(timeLeft / 60)}:${String(
    timeLeft % 60
  ).padStart(2, "0")}`;

  const fetchQuizzes = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const id = localStorage.getItem("id");

    const body = JSON.stringify({ id, difficulty });

    try {
      const res = await axios.post(`${API_URL}/quiz`, body, config);
      console.log(res);
      setQuiz(res.data);
    } catch (err) {
      console.log(err);
      setErrorMessage(err.response.data.error);
    }
  };

  return (
    <div className="flex items-center w-full justify-center h-screen">
      {errorMessage ? (
        <div>{errorMessage}</div>
      ) : (
        <div className=" w-[80%] flex gap-6 mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle>
                <p className="text-4xl font-extrabold text-secondary md:text-5xl">
                  Question {num} of 10
                </p>
              </CardTitle>
              <CardDescription>
                <p className="text-2xl font-medium text-secondary md:text-3xl my-3">
                  {title}
                </p>
              </CardDescription>
            </CardHeader>
            <CardContent>
              {type == "text" ? "" : <AudioPlayer base64Audio={audioData} />}
              <hr className="bg-primary text-primary h-1 my-2" />
              <p className="text-2xl font-extrabold text-secondary md:text-3xl">
                Answer
              </p>
              <form
                className="flex gap-3 items-center"
                onSubmit={(e) => handleSubmit(e)}
              >
                <Input
                  className="bg-white my-2"
                  value={currentAnswer}
                  onChange={handleAnswerChange}
                  disabled={isSubmitted}
                />
                <Button disabled={isSubmitted} type="submit">
                  Submit
                </Button>
              </form>
              <div>
                {feedback && (
                  <p
                    className={
                      feedback == "Wrong"
                        ? "text-red-400 text-2xl font-bold"
                        : "text-green-400 text-2xl font-bold"
                    }
                  >
                    {feedback}
                  </p>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <p>
                <div className="my-2 flex gap-2">
                  {num < 10 ? (
                    <Button
                      onClick={handleNextQuestion}
                      disabled={!isSubmitted}
                      className="bg-secondary hover:bg-stone-500"
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSubmitQuiz}
                      disabled={!isSubmitted}
                      className="bg-secondary"
                    >
                      Submit Quiz
                    </Button>
                  )}
                </div>
              </p>
            </CardFooter>
          </Card>
          <div className="">
            <div className="bg-stone-700 p-12 rounded-lg">
            <p className="text-3xl font-medium text-yellow-400 md:text-5xl w-24">
              {formattedTime}
            </p>

            </div>
             
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.auth.error,
  user: state.auth.user,
});

export default connect(mapStateToProps)(Quizz);

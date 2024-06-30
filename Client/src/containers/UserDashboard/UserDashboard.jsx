import { Button } from "@/components/ui/button";
import API_URL from "@/url";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { connect } from "react-redux";

const UserDashboard = ({isAuthenticated}) => {
  const {toast} = useToast();

  const [errorMessage, setErrorMessage] = useState(null);
  const [difficulty, setDifficulty] = useState(null);

  const navigate = useNavigate();
  const fetchQuizzes = async (difficulty) => {
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
      navigate(`/quizz/${difficulty}`);
    } catch (err) {
      console.log(err);
      setErrorMessage(err.response.data.error);
    }
  };

  const handleButtonClick = (difficulty)=>{
    fetchQuizzes(difficulty);
    localStorage.setItem("current_question", 0);
    const answers = [];
    const stringifiedAnswers = JSON.stringify(answers)
    localStorage.setItem("answers", stringifiedAnswers);
  }

  useEffect(() => {
    if(errorMessage){
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: errorMessage,
      })
    }
  }, [errorMessage]);
  
  useEffect(() => {
    const checkAuth = async () => {
      console.log(isAuthenticated);
      if(!isAuthenticated){
        navigate("/");
      }
    }
    checkAuth();
  }, [isAuthenticated]);



  return (
    <div>
      <Navbar/>
      <section className="">
        <div className="mx-auto max-w-screen-xl min-h-[40rem] px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Your dashboard
            </h2>

            <p className="mt-4 text-gray-500 sm:text-xl">
              Take our quiz to assess your ear health and get personalized
              feedback.
            </p>
          </div>

          <div className="mt-8 sm:mt-12">
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="flex flex-col rounded-lg bg-stone-50 px-4 py-8 text-center">
                <dt className="order-last text-lg font-medium text-gray-500 mt-4">
                  <Button onClick={() => handleButtonClick("easy")}>Start Quiz</Button>
                </dt>

                <dd className="text-4xl font-extrabold text-secondary md:text-5xl">
                  Easy
                </dd>
              </div>

              <div className="flex flex-col rounded-lg bg-stone-50 px-4 py-8 text-center">
                <dt className="order-last text-lg font-medium text-gray-500 mt-4">
                  <Button onClick={() => handleButtonClick("medium")}>Start Quiz</Button>
                </dt>

                <dd className="text-4xl font-extrabold text-secondary md:text-5xl">
                  Medium
                </dd>
              </div>

              <div className="flex flex-col rounded-lg bg-stone-50 px-4 py-8 text-center">
                <dt className="order-last text-lg font-medium text-gray-500 mt-4">
                  <Button onClick={() => handleButtonClick("hard")}>Start Quiz</Button>
                </dt>

                <dd className="text-4xl font-extrabold text-secondary md:text-5xl">
                  Hard
                </dd>
              </div>
            </dl>
              
          </div>
        </div>
      </section>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.auth.error,
  user: state.auth.user,
});

export default connect(mapStateToProps)(UserDashboard);

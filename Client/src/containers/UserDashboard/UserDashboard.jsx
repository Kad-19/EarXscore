import { Button } from "@/components/ui/button";
import React from "react";
import { NavLink } from "react-router-dom";

const UserDashboard = () => {
  return (
    <div>
      <section className="">
        <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
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
                  <Button><NavLink to='/quizz/easy'>Start Quiz</NavLink></Button>
                </dt>

                <dd className="text-4xl font-extrabold text-secondary md:text-5xl">
                  Easy
                </dd>
              </div>

              <div className="flex flex-col rounded-lg bg-stone-50 px-4 py-8 text-center">
                <dt className="order-last text-lg font-medium text-gray-500 mt-4">
                  <Button><NavLink to='/quizz/medium'>Start Quiz</NavLink></Button>
                </dt>

                <dd className="text-4xl font-extrabold text-secondary md:text-5xl">
                  Medium
                </dd>
              </div>

              <div className="flex flex-col rounded-lg bg-stone-50 px-4 py-8 text-center">
                <dt className="order-last text-lg font-medium text-gray-500 mt-4">
                  <Button><NavLink to='/quizz/hard'>Start Quiz</NavLink></Button>
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

export default UserDashboard;

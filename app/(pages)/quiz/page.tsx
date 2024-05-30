"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Question = {
  question: string;
  options: string[];
  correctOptionIndex: number;
};

const QuizPage: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(20);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const router = useRouter();

  useEffect(() => {
    async function getQuestions() {
      try {
        const response = await fetch('/api/quiz/questions', {
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-cache",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const responseData = await response.json();
        const shuffledQuestions: Question[] = responseData.questions.map((question: Question) => ({
          ...question,
          options: question.options.sort(() => 0.5 - Math.random())
        }));
        setQuestions(shuffledQuestions);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    getQuestions();
  }, []);

  useEffect(() => {
    if (timeRemaining === 0) {
      nextQuestion();
    }
    const timer = setInterval(() => {
      setTimeRemaining(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining]);

  const handleOptionChange = (questionIndex: number, optionIndex: number) => {
    setAnswers({ ...answers, [questionIndex]: optionIndex });
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setTimeRemaining(20);
    } else {
      localStorage.setItem('answers', JSON.stringify(answers));
      localStorage.setItem('questions', JSON.stringify(questions));
      router.push('/result');
    }
  };

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="p-4 flex flex-col h-[90dvh] justify-center items-center">

      <div className=' h-[10%] w-full flex justify-center items-center ' >
        <div className="border-b flex p-3 justify-around items-center xl:w-[50%] ">
          <div className="mb-4 text-lg font-semibold">Time Remaining: {timeRemaining} seconds</div>
          <span className="block font-bold mb-2 text-lg">{`${currentQuestionIndex + 1} / ${questions.length}`}</span>
        </div>
      </div>

      <div className="h-[90%] flex flex-col justify-center items-center xl:w-[50%] ">
        <div className=' w-full ' >
          <h3 className="mb-4 w-full text-2xl font-bold">{currentQuestion?.question}</h3>
          <ul className="space-y-2">

            {currentQuestion?.options.map((option, index) => (
              <li
                key={index}
                className={`p-4 w-full border rounded-lg cursor-pointer ${answers[currentQuestionIndex] === index ? 'bg-green-200 border-green-500' : 'bg-white'}`}
                onClick={() => handleOptionChange(currentQuestionIndex, index)}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={nextQuestion}
          className="mt-10 px-4 w-full py-3 bg-blue-500 duration-200 text-white rounded-2xl hover:bg-blue-700"
        >
          {currentQuestionIndex < questions.length - 1 ? "Next" : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default QuizPage;

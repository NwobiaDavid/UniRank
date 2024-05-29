"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [answers, setAnswers] = useState({});
  const router = useRouter();

  useEffect(() => {
    fetch('/api/quiz/questions')
      .then(response => response.json())
      .then(data => {
        const shuffledQuestions = data.map((question: { options: any[]; }) => ({
          ...question,
          options: question.options.sort(() => 0.5 - Math.random())
        }));
        setQuestions(shuffledQuestions);
      });
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

  const handleOptionChange = (questionIndex: number, optionIndex: any) => {
    setAnswers({ ...answers, [questionIndex]: optionIndex });
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setTimeRemaining(30);
    } else {
      router.push('/result');
    }
  };

  const handleSubmit = () => {
    router.push('/result');
  };

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div>
      <div>
        Time Remaining: {timeRemaining} seconds
      </div>
      <div>
        <h3>{currentQuestion.question}</h3>
        <ul>
          {currentQuestion.options.map((option: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined, i: React.Key | readonly string[] | null | undefined) => (
            <li key={i}>
              <label>
                <input
                  type="radio"
                  name={`question-${currentQuestionIndex}`}
                  value={i}
                  checked={answers[currentQuestionIndex] === i}
                  onChange={() => handleOptionChange(currentQuestionIndex, i)}
                />
                {option}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={nextQuestion}>Next</button>
    </div>
  );
};

export default QuizPage;

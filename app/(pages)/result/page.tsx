"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Question = {
  answer: number;
};

const ResultPage: React.FC = () => {
  const router = useRouter();
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    const answers = JSON.parse(localStorage.getItem('answers') || '{}');
    const questions: Question[] = JSON.parse(localStorage.getItem('questions') || '[]');

    if (questions.length > 0) {
      let correctAnswers = 0;

      questions.forEach((question, index) => {
        if (answers[index] !== undefined && question.answer === answers[index]) {
          correctAnswers++;
          console.log("correctt ");
        }
      });

      setScore((correctAnswers / questions.length) * 100);
    } else {
      setScore(0); 
      console.log("not here ")
    }
  }, []);

  if (score === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Your Score: {score.toFixed(2)}</h1>
      <button
        onClick={() => router.push('/home')}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
      >
        Go Home
      </button>
    </div>
  );
};

export default ResultPage;

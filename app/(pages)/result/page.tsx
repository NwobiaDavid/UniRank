"use client";

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Avatar } from "@nextui-org/avatar";
import { Spinner } from "@nextui-org/spinner";
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';

type Question = {
  answer: number;
};

const ResultPage: React.FC = () => {
  const router = useRouter();
  const { width, height } = useWindowSize();
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [img, setImg] = useState("");
  const [showConfetti, setShowConfetti] = useState<boolean>(true);

  const { data: session } = useSession();
  const numtry = 1;

  useEffect(() => {
    const completedQuiz = localStorage.getItem('completedQuiz');
    if (!completedQuiz) {
      router.push('/home');
      return;
    }

    const answers = JSON.parse(localStorage.getItem('answers') || '{}');
    const questions: Question[] = JSON.parse(localStorage.getItem('questions') || '[]');
    const timeSpent: { [key: number]: number } = JSON.parse(localStorage.getItem('timeSpent') || '{}');

    if (session?.user?.image) {
      setImg(session.user.image);
    }

    if (questions.length > 0) {
      let correctAnswers = 0;
      let totalTime = 0;

      questions.forEach((question, index) => {
        if (answers[index] !== undefined && question.answer === answers[index]) {
          correctAnswers++;
        }
        if (timeSpent[index] !== undefined) {
          totalTime += timeSpent[index];
        }
      });

      const accuracy = (correctAnswers / questions.length) * 100;
      const timeFactor = (totalTime / questions.length) > 10 ? 0.5 : 1; // Arbitrary formula for time factor
      const finalScore = (accuracy * timeFactor) * 10; // Scale to 1000

      setScore(Math.round(finalScore));

      setTimeout(() => {
        localStorage.removeItem('answers');
        localStorage.removeItem('questions');
        localStorage.removeItem('timeSpent');
        localStorage.removeItem('completedQuiz');
      }, 5000);
    } else {
      setScore(0);
    }

    setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
  }, [session]);

  useEffect(() => {
    if (score !== null) {
      const updateScore = async () => {
        try {
          setLoading(true);
          const formatScore = score;
          const response = await fetch(`/api/quiz/update`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ formatScore, numtry }),
          });

          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      };

      updateScore();
    }
  }, [score]);

  if (score === null) {
    return <div className='text-center p-32'><Spinner label="Loading..." color="default" labelColor="foreground" /></div>;
  }

  return (
    <div className='px-32 py-3 flex justify-center'>
      {loading ? (
        <div><Spinner label="Loading..." color="default" labelColor="foreground" /></div>
      ) : (
        <div className="p-4 flex items-center flex-col">
          <div className='mb-[7rem]'>
            <Avatar isBordered src={img} />
          </div>
          <div className="flex flex-col justify-center items-center">
            <p className="font-bold text-sm xl:text-base uppercase">Score</p>
            <h1 className="text-9xl mb-12"><span className="font-bold">{score}</span></h1>
          </div>
          <button
            onClick={() => router.push('/home')}
            className="px-4 py-2 bg-[#161A30] duration-200  hover:bg-[#000000]  text-white rounded-lg "
          >
            Go Home
          </button>
          {showConfetti && <Confetti width={width} height={height} />}
        </div>
      )}
    </div>
  );
};

export default ResultPage;

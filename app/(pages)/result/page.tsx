"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Question = {
    answer: number;
};

const ResultPage: React.FC = () => {
    const router = useRouter();
    const [score, setScore] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

    const numtry = 1;

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

            const rawScore = (correctAnswers / questions.length) * 200;
            setScore(Math.round(rawScore));
        } else {
            setScore(0);
            console.log("not here ")
        }
    }, []);

    useEffect(() => {
        if (score !== null) {
            console.log("score---> " + score + " numtry => " + numtry);

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
                } catch (error: any) {
                    console.error("Error fetching data:", error);
                } finally {
                    setLoading(false);
                }
            };

            updateScore();
        }
    }, [score]);

    if (score === null) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            {loading ? (
                <div> loading</div >
            ) : (
                <div className="p-4">
                    <h1 className="text-3xl font-bold mb-4">Your Score: {score}</h1>
                    <button
                        onClick={() => router.push('/home')}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                    >
                        Go Home
                    </button>
                </div>
            )
            }
        </div>
    );
};

export default ResultPage;

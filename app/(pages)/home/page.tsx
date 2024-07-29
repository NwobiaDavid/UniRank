"use client"
import Link from 'next/link';
/* eslint-disable react-hooks/rules-of-hooks */

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const page = () => {

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(0);
  const [error, setError] = useState("");
  const [quizStarted, setQuizStarted] = useState(false);


  // const startQuiz = () => {
  //   router.push('/quiz');
  // };

  useEffect(() => {
    async function getScore() {
      try {
        setLoading(true)
        const response = await fetch(`/api/util/me`, {
          headers: {
            "Content-Type": "application/json",
          }
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }


        const responseData = await response.json();
        setScore(responseData?.user?.score);
        setError("");

      } catch (error: any) {
        console.error("Error fetching data:", error);
        setError(error?.message);
      }
      finally {
        setLoading(false);
      }
    }

    getScore();
  }, [])


  const startQuiz = () => {
    setQuizStarted(true);
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
      router.push('/quiz');
    }
  };


  return (
    <div className=' w-full h-[80dvh] flex flex-col justify-center items-center p-2 xl:px-24 ' >
      <div className=' h-[10%] w-[90%] border-b border-[#31304D] flex justify-between md:justify-around items-center p-2 xl:p-10 ' >
        <h2 className='font-bold mr-1 rounded-lg p-1 text-2xl ' >Home</h2>
        <h2 className='font-semibold p-2  border-[#31304D] border uppercase rounded-lg px-3 text-lg ml-1' >score: <span className="text-red-500">{score}</span></h2>
      </div>

      <div className='h-[90%] w-full p-2  xl:p-24 flex justify-center items-center flex-col ' >
        <div className="mb-16 w-full md:w-[70%] xl:w-[80%] text-center flex flex-col justify-center items-center ">
          <div className='flex w-[90%] xl:w-[40%] mb-4 text-lg items-center border border-green-500 bg-green-200 p-2 rounded-lg justify-center ' >
            <span className='font-semibold capitalize ' > time limit: <span className='font-normal text-green-700' >10mins</span></span>
          </div>

          <div className='w-full  '>
            <h1 className=" text-base  xl:text-lg">Welcome to the UniRank! Here are a few things to keep in mind before you start:</h1>
            {/* <br />
            <div className="py-2 px-3 mt-1 text-left  border border-[#d4ccba] rounded-xl "><strong>How the Test Works:</strong> You will have 30 questions to answer within a 10-minute time limit with a 20-seconds duration for each question.e.</div>
            <div className="py-2 px-3 text-left   border border-[#d4ccba] rounded-xl my-3"><strong>How It&apos;s Graded:</strong> Your score will be calculated based on the number of correct answers you provide. Additionally, the time you take to amer.</div>
            <div className="py-2 px-3 text-left  border border-[#d4ccba] rounded-xl"><strong>What to Be Cautious About:</strong> Once you start the quiz, it is recommended to avoid refreshing the page or navigating away, as this could r. </div>
            <br /> */}
            {/* <br />
            <div className="py-2 px-3 mt-1 text-left  border border-[#d4ccba] rounded-xl "><strong>How the Test Works:</strong> You will have 30 questions to answer within a 10-minute time limit with a 20-seconds duration for each question. Each question will have multiple choices, and you must select the correct one.</div>
            <div className="py-2 px-3 text-left   border border-[#d4ccba] rounded-xl my-3"><strong>How It&apos;s Graded:</strong> Your score will be calculated based on the number of correct answers you provide. Additionally, the time you take to answer each question may influence your final score, so be mindful of the timer.</div>
            <div className="py-2 px-3 text-left  border border-[#d4ccba] rounded-xl"><strong>What to Be Cautious About:</strong> Once you start the quiz, it is recommended to avoid refreshing the page or navigating away, as this could result in loss of progress. Ensure you are in a quiet environment to concentrate fully on the quiz. </div>
            <br /> */}

            <h1 className=" text-base  xl:text-lg" >It is advisable to read through the rules before you take the test. </h1>
            <h1 className=" text-base  xl:text-lg" >Good luck, and give it your best shot!</h1>
          </div>
        </div>

        <div className="flex gap-3 items-center">
          <Link href={"/rules"} className=' py-2 px-3 text-sm rounded-lg border border-[#161A30] font-semibold hover:bg-[#161A30] hover:text-white duration-200 active:scale-95 '>
            Rules
          </Link>

          <button className=' py-2 px-3 text-sm rounded-lg text-white bg-[#161A30] font-semibold hover:bg-opacity-85 duration-200 active:scale-95 ' onClick={startQuiz} >
            {score > 0 ? "Retake Test" : "Take Test"}
          </button>
        </div>

      </div>
    </div>
  )
}

export default page

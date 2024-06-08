"use client"
/* eslint-disable react-hooks/rules-of-hooks */

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const page = () => {

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(0);
  const [error,setError] = useState("");
  const [quizStarted, setQuizStarted] = useState(false);


  // const startQuiz = () => {
  //   router.push('/quiz');
  // };

  useEffect(() => {
    async function getScore () {
      try{
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
      setScore(responseData?.user.score);
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

  // if (!quizStarted) {
  //   return (
  //     <div className="flex flex-col h-screen justify-center items-center">
  //       <button
  //         onClick={startQuiz}
  //         className="px-4 py-2 bg-blue-500 text-white rounded-lg"
  //       >
  //         Start Quiz
  //       </button>
  //     </div>
  //   );
  // }


  return (
    <div className=' w-full h-[70dvh] flex flex-col justify-center items-center px-24 ' >
      <div className=' h-[10%] w-[90%] border-b flex justify-around items-center p-10 ' >
        <h2 className='font-bold mr-1 rounded-lg p-1 text-2xl ' >Home</h2>
        {/* <span> / </span> */}
        <h2 className='font-semibold p-2 border uppercase rounded-lg px-3 text-lg ml-1' >score: <span className="text-red-500">{score}</span></h2>
      </div>

      <div className='h-[90%] w-full  p-24 flex justify-center items-center flex-col ' >
        <div className="mb-16 w-[60%] text-center flex flex-col justify-center items-center ">
          <div className='flex w-[40%] mb-2 text-lg items-center border border-green-500 bg-green-200 p-2 rounded-lg justify-center ' >
            <span className='font-semibold capitalize ' > time limit: <span className='font-normal text-green-700' >10mins</span></span>
          </div>
          <p> some text here some text here some text here some text here </p>
        </div>
        <button className=' p-2 text-sm rounded-lg border hover:scale-105 duration-200 active:scale-95 ' onClick={startQuiz} >
          {score>0 ? "Retake Test" : "Take Test"}
        </button>
      </div>
    </div>
  )
}

export default page

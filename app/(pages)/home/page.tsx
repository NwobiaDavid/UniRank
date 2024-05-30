"use client"
/* eslint-disable react-hooks/rules-of-hooks */

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const page = () => {

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(0);
  const [error,setError] = useState("");

  const startQuiz = () => {
    router.push('/quiz');
  };

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


  return (
    <div className=' w-full h-[70dvh] flex flex-col justify-center items-center px-24 ' >
      <div className=' h-[10%] w-[70%] border-b flex justify-center items-center p-10 ' >
        <h2 className='font-bold text-lg bg-slate-800 mr-1 rounded-lg p-1 text-white ' >Home</h2>
        <span> / </span>
        <h2 className='font-semibold text-lg ml-1' >score: <span className="text-red-500">{score}</span></h2>
      </div>

      <div className='h-[90%] w-full  p-24 flex justify-center items-center flex-col ' >
        <div className="mb-16 w-[40%] flex flex-col justify-center items-center ">
          <div className='flex mb-2 w-full text-lg items-center border border-green-500 bg-green-200 p-2 rounded-lg justify-center ' >
            <span className='font-semibold' > time limit: <span className='font-normal text-green-700' >10mins</span></span>
          </div>
          <p> some text here</p>
        </div>
        <button className=' p-2 text-sm rounded-lg border hover:scale-105 duration-200 active:scale-95 ' onClick={startQuiz} >
          {score>0 ? "Retake Test" : "Take Test"}
        </button>
      </div>
    </div>
  )
}

export default page

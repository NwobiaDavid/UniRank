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
    <div className=' p-24 w-full h-[70dvh] ' >
      <div className=' h-[10%] ' >
        <h2>Home</h2>
        <span>score: {score}</span>
      </div>
      <div className='h-[90%] flex justify-center items-center flex-col ' >
        <div className='flex items-center justify-center ' >
          <h2 className=' text-5xl mb-5' >home</h2>
          <span> time limit: <span>10mins</span></span>
        </div>
        <button className=' p-2 rounded-lg border ' onClick={startQuiz} >
          take quiz
        </button>
      </div>
    </div>
  )
}

export default page

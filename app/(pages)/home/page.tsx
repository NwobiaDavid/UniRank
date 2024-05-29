"use client"
/* eslint-disable react-hooks/rules-of-hooks */

import { useRouter } from 'next/navigation';
import React from 'react'

const page = () => {

  const router = useRouter();

  const startQuiz = () => {
    router.push('/quiz');
  };

  return (
    <div className=' p-24 w-full h-[70dvh] ' >
      <div className=' h-[10%] ' >
        <h2>Home</h2>
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

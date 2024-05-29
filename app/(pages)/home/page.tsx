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
    <div>
      home
      <button onClick={startQuiz} >
        take quiz
      </button>
    </div>
  )
}

export default page

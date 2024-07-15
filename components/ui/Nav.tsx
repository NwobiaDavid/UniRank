"use client"

import React from 'react'
import GetStartedButton from './btn/GetStartedButton'
import { useSession } from 'next-auth/react'

const Nav = () => {

  const session = useSession();

  return (
    <div className="w-full flex justify-center fixed top-0 max-h-fit items-center p-5 ">
      <div className=' xl:w-[40%] bg-white z-10 p-2 border rounded-xl flex justify-between items-center  ' >
        <div className="w-1/3 flex   ">
          <div className=' rounded-lg min-w-12 min-h-12 text-center bg-blue-300 ' >
            logo
          </div>
        </div>
        <div className=' w-1/3 flex justify-center items-center '>

        <h1 className='text-xl font-bold' >UniRank</h1>
        </div>
        <div className=' w-1/3 flex justify-end items-end ' >
          <GetStartedButton session={session} />
        </div>
      </div>
    </div>
  )
}

export default Nav

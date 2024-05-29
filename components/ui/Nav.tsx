"use client"

import React from 'react'
import GetStartedButton from './btn/GetStartedButton'
import { useSession } from 'next-auth/react'

const Nav = () => {

  const session = useSession();

  return (
    <div className=' bg-white z-10 p-6 fixed max-h-fit top-0 w-full border-b rounded-full flex justify-around items-center  ' >
      <h1 className='text-4xl font-bold' > navbar </h1>
      <div>
        <GetStartedButton session={session} />
      </div>
    </div>
  )
}

export default Nav

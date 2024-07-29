import React from 'react'
import GetStartedButton from '../ui/btn/GetStartedButton'
import { useSession } from 'next-auth/react'

const CTA = () => {
    const session = useSession();
  return (
    <div className='flex justify-center items-center w-full h-[70dvh] ' >
        <div className=' w-[50%] flex justify-center flex-col items-center '>
            <h1 className=' text-white  text-2xl mb-5 ' >some text here</h1>
            <GetStartedButton session={session} />
        </div>
    </div>
  )
}

export default CTA
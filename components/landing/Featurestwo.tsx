import React from 'react'

const Featurestwo = () => {
  return (
    <div className='text-white flex flex-col items-center h-full py-20 '>
      <div className="flex justify-center h-[10%]  xl:w-[60%] text-center xl:text-left mb-7 w-full items-center flex-col " >
        <h1 className=" text-2xl text-center  lg:text-4xl font-bold opacity-80 capitalize " >Innovative Tools to Elevate Your Academic Experience</h1>
        <p className=' text-center ' >Unirank combines advanced technology and innovative features to ensure fair assessments, foster healthy competition, and provide precise insights into student IQ across Nigeria's universities.</p>
      </div>

      <div className='h-[90%] w-full flex flex-col gap-10 ' >
        <div className='w-full h-1/3 flex xl:flex-row flex-col  justify-between items-center' >
          <div className=' w-full xl:w-[40%] h-full flex justify-center items-center  '>
            <span className="xl:text-[15rem] ">🏆</span>
          </div>
          <div className=' px-6 py-3 w-full flex justify-center flex-col  text-center xl:text-left xl:w-[60%] xl:border-b-0 border-b   h-full xl:border-l ' >
            <h2 className=' text-4xl  mb-3 font-semibold  ' >Dynamic Leadership Board</h2>
            <p className=' xl:w-[80%] ' >See how you stack up. Our real-time leadership board showcases top-performing students across Nigeria, motivating you to reach the top. </p>
          </div>
        </div>

        <div className='w-full  h-1/3 xl:flex hidden   xl:flex-row flex-col justify-between items-center' >
          <div className='h-full py-3 px-5 text-right w-full flex flex-col justify-center items-end xl:w-[60%]  border-r ' >
            <h2 className=' text-4xl mb-3 font-semibold ' >Advanced Anti-Cheating System</h2>
            <p className=' xl:w-[80%] ' >Your integrity matters. Our robust anti-cheating mechanisms ensure that every IQ test result is fair and credible, maintaining the accuracy of our rankings </p>
          </div>
          <div className='h-full flex justify-center  w-full items-center xl:w-[40%]  '>
            <span className='  xl:text-[15rem] ' >🛡️</span>
          </div>
        </div>

        <div className='w-full xl:hidden  h-1/3 flex  xl:flex-row flex-col  justify-between items-center' >
        <div className='h-full flex justify-center  w-full items-center xl:w-[40%]  '>
            <span className='  xl:text-[15rem] ' >🛡️</span>
          </div>
          <div className='h-full p-3 w-full text-center xl:text-left xl:w-[60%] border-b xl:border-l  ' >
            <h2 className=' text-4xl  mb-3 font-semibold ' >Advanced Anti-Cheating System</h2>
            <p className='  ' >Your integrity matters. Our robust anti-cheating mechanisms ensure that every IQ test result is fair and credible, maintaining the accuracy of our rankings </p>
          </div>
        </div>


        <div className='w-full  h-1/3 flex  xl:flex-row flex-col  justify-between items-center' >
          <div className='flex justify-center h-full items-center w-full xl:w-[40%] '>
            <span className="xl:text-[15rem] ">📐</span>
          </div>
          <div className='h-full px-6 py-3 w-full text-center flex flex-col  justify-center  xl:text-left xl:w-[60%]  xl:border-l  ' >
            <h2 className=' text-4xl  mb-3 font-semibold  ' > Precision Scoring Algorithm </h2>
            <p className='xl:w-[80%]   ' > Every detail counts. Our sophisticated scoring system analyzes various cognitive abilities, providing a comprehensive and nuanced IQ score that truly reflects your potential. </p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Featurestwo

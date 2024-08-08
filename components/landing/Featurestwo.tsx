import React from 'react'

const Featurestwo = () => {
  return (
    <div className='text-white h-full py-20 '>
      <div className="flex justify-center h-[10%] text-center xl:text-left mb-5 w-full items-center flex-col " >
        <h1  className=" text-2xl  lg:text-4xl font-bold opacity-80 capitalize " >some header that'll be long here</h1>
        <p>a smaller one sub header here</p>
      </div>

      <div className='h-[90%] flex flex-col gap-5 ' >
        <div className='w-full h-1/3 flex xl:flex-row flex-col  justify-between items-center' >
          <div className=' w-full xl:w-[40%] h-full flex justify-center bg-red-500 '>
              image
          </div>
          <div className=' p-3 w-full text-center xl:text-left xl:w-[60%] xl:border-b-0 border-b   h-full xl:border-l ' >
              text here
          </div>
        </div>

        <div className='w-full  h-1/3 xl:flex hidden   xl:flex-row flex-col justify-between items-center' >
          <div className='h-full p-3 text-right w-full xl:w-[60%]  border-r ' >
              text here
          </div>
          <div className='h-full flex justify-center w-full xl:w-[40%] bg-red-500 '>
              image
          </div>
        </div>
        <div className='w-full xl:hidden  h-1/3 flex  xl:flex-row flex-col  justify-between items-center' >
          <div className='flex justify-center h-full w-full xl:w-[40%] bg-red-500 '>
              image
          </div>
          <div className='h-full p-3 w-full text-center xl:text-left xl:w-[60%] border-b xl:border-l  ' >
              text here
          </div>
        </div>


        <div className='w-full  h-1/3 flex  xl:flex-row flex-col  justify-between items-center' >
          <div className='flex justify-center h-full w-full xl:w-[40%] bg-red-500 '>
              image
          </div>
          <div className='h-full p-3 w-full text-center xl:text-left xl:w-[60%]  xl:border-l  ' >
              text here
          </div>
        </div>

      </div>
    </div>
  )
}

export default Featurestwo

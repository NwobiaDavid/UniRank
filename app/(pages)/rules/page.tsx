import Link from 'next/link';
import React from 'react'
import { FaArrowLeft } from "react-icons/fa6";

const page = () => {
    return (
        <div className='px-24 h-full relative w-full overflow-x-hidden ' >
            <div className=' w-full  flex border-[#31304D] border-b top-[1rem] p-4' >
                <Link href={"/home"} className="p-3 h-[50px] w-[50px] flex justify-center items-center rounded-full border border-[#d4ccba] hover:bg-[#31304D] hover:text-white duration-200 ">
                    <FaArrowLeft />
                </Link>
            </div>

            <div className=' mt-[5rem] '>
                <div className='w-full text-center mb-5 ' >
                    <h1 className="font-bold text-4xl">Rules</h1>
                </div>


                <div className=' mb-5 ' >
                    <div className='flex w-full p-3  ' >
                        <div className=' w-[10%] flex justify-center items-center border-r border-[#31304D] px-3 ' >
                            <span className="rounded-full w-[50px] flex justify-center items-center h-[50px] bg-[#d4ccba] p-3">1</span>
                        </div>
                        <div className="px-3 w-[90%] " >
                            <div className='font-semibold capitalize text-xl' >
                                header here
                            </div>
                            <div className='text-lg ' >
                               Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio, quos ut quasi, consectetur assumenda dignissimos saepe est excepturi minima ipsam earum vitae nesciunt molestiae et, quaerat accusantium? Aspernatur, quisquam cum?
                            </div>
                        </div>
                    </div>

                </div>


                <div className=' mb-5 ' >
                    <div className='flex w-full p-3  ' >
                        <div className=' w-[10%] flex justify-center items-center border-r border-[#31304D] px-3 ' >
                            <span className="rounded-full w-[50px] flex justify-center items-center h-[50px] bg-[#d4ccba] p-3">2</span>
                        </div>
                        <div className="px-3 w-[90%] " >
                            <div className='font-semibold capitalize text-xl' >
                                header here
                            </div>
                            <div className='text-lg ' >
                               Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio, quos ut quasi, consectetur assumenda dignissimos saepe est excepturi minima ipsam earum vitae nesciunt molestiae et, quaerat accusantium? Aspernatur, quisquam cum?
                            </div>
                        </div>
                    </div>

                </div>

                <div className=' mb-5 ' >
                    <div className='flex w-full p-3  ' >
                        <div className=' w-[10%] flex justify-center items-center border-r border-[#31304D] px-3 ' >
                            <span className="rounded-full w-[50px] flex justify-center items-center h-[50px] bg-[#d4ccba] p-3">3</span>
                        </div>
                        <div className="px-3 w-[90%] " >
                            <div className='font-semibold capitalize text-xl' >
                                header here
                            </div>
                            <div className='text-lg ' >
                               Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio, quos ut quasi, consectetur assumenda dignissimos saepe est excepturi minima ipsam earum vitae nesciunt molestiae et, quaerat accusantium? Aspernatur, quisquam cum?
                            </div>
                        </div>
                    </div>

                </div>

                {/* <br />
                <div className="py-2 px-3 mt-1 text-left shadow-md shadow-[#d4ccba] border border-[#d4ccba] rounded-xl "><strong>How the Test Works:</strong> You will have 30 questions to answer within a 10-minute time limit with a 20-seconds duration for each question. Each question will have multiple choices, and you must select the correct one.</div>
                <div className="py-2 px-3 text-left  shadow-md shadow-[#d4ccba] border border-[#d4ccba] rounded-xl my-3"><strong>How It&apos;s Graded:</strong> Your score will be calculated based on the number of correct answers you provide. Additionally, the time you take to answer each question may influence your final score, so be mindful of the timer.</div>
                <div className="py-2 px-3 text-left shadow-md shadow-[#d4ccba] border border-[#d4ccba] rounded-xl"><strong>What to Be Cautious About:</strong> Once you start the quiz, it is recommended to avoid refreshing the page or navigating away, as this could result in loss of progress. Ensure you are in a quiet environment to concentrate fully on the quiz. </div>
                <br /> */}
            </div>
        </div>
    )
}

export default page
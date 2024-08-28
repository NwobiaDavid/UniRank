import React from 'react';
import { FaLongArrowAltRight } from "react-icons/fa";

const Problem = () => {
  const data = [
    {
      emoji: '📝',
      header: 'Take the IQ Test',
      desc: 'Start by taking our expertly designed IQ test, tailored for university students across Nigeria. Your results contribute to the data used for university rankings.'
    },
    {
      emoji: '📊',
      header: 'Analyze and Compare',
      desc: 'Once you’ve completed the test, your IQ score is analyzed and compared with other students nationwide, helping you see where you stand.'
    },
    {
      emoji: '🏅',
      header: 'Discover Rankings',
      desc: "Based on aggregated results, we rank universities according to their students' average IQ scores, giving you a clear picture of Nigeria’s top academic institutions."
    },
  ];

  return (
    <div className="text-white w-full flex  items-center flex-col  ">
      <div className="flex justify-center text-center lg:text-left mb-5 w-full lg:w-[70%] items-center flex-col " >
        <h2 className=" text-2xl  md:text-4xl font-bold opacity-80 capitalize " >Understand the Rankings That Matter</h2>
        <p className=' text-center ' >Explore how Unirank evaluates and ranks universities based on the intellectual caliber of their students.</p>
      </div>
      <div className="flex justify-center w-full lg:flex-row flex-col items-center">
        {data.map((item, index) => (
          <React.Fragment  key={index}>
            <div className="w-full lg:w-[60%] flex items-center lg:flex-row flex-col  justify-center  ">
              <div className="flex bg-[#F5F7F8] text-black xl:w-[350px] lg:w-[250px] md:w-[350px] w-[250px] h-[300px] xl:h-[260px] rounded-lg py-6 px-6 flex-col  ">
                <div className=" text-2xl md:text-4xl h-[15%] ">{item.emoji}</div>
                <div className="w-full h-[85%]  flex flex-col  ">
                  <h3 className="text-xl md:text-2xl mt-4 font-semibold  ">{item.header}</h3>
                  <p className="mt-2">{item.desc}</p>
                </div>
              </div>
              {index < data.length - 1 && (
                <div className=" my-3 lg:my-0 lg:mx-3">
                  <div className=" text-xl md:text-3xl rotate-90 xl:rotate-0 bg-blue-500 border-2 border-blue-800 rounded-full p-2">
                    <FaLongArrowAltRight />
                  </div>
                   </div>
              )}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Problem;

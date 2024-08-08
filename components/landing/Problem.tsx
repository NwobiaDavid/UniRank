import React from 'react';
import { FaLongArrowAltRight } from "react-icons/fa";

const Problem = () => {
  const data = [
    {
      emoji: '😊',
      header: 'Sign Up',
      desc: 'The description here for item 1'
    },
    {
      emoji: '🚀',
      header: 'Take the Test',
      desc: 'The description here for item 2'
    },
    {
      emoji: '🌟',
      header: 'See Where Your University Ranks',
      desc: 'The description here for item 3'
    },
  ];

  return (
    <div className="text-white w-full ">
      <div className="flex justify-center text-center lg:text-left mb-5 w-full items-center flex-col " >
        <h2 className=" text-2xl  md:text-4xl font-bold opacity-80 capitalize " >It&apos;s all about your experience</h2>
        <p>we are dedicated to give you the best experience so that you can easily take the test</p>
      </div>
      <div className="flex justify-center w-full lg:flex-row flex-col items-center">
        {data.map((item, index) => (
          <React.Fragment  key={index}>
            <div className="w-full lg:w-[60%] flex items-center lg:flex-row flex-col  justify-center  ">
              <div className="flex bg-[#F5F7F8] text-black xl:w-[300px] lg:w-[250px] md:w-[350px] w-[250px] h-[300px] xl:h-[250px] rounded-lg py-6 px-6 flex-col  ">
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

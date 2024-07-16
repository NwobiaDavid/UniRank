import Image from 'next/image';
import React from 'react'
import Marquee from "react-fast-marquee";

const Unilist = () => {

    const unis = [
        {
            name: "covenant university",
            logo: "/images/logo/cu.png"
        },{
            name: "university of nigeria",
            logo: "/images/logo/unn (2).png"
        },{
            name: "University of lagos",
            logo: "/images/logo/unilag.png"
        },{
            name: "babcock university",
            logo: "/images/logo/Babcock.jpg"
        },
        {
            name: "landmark university",
            logo: "/images/logo/landmark.png"
        },

    ]
  return (
    <div className=' flex py-10 justify-center ' >
        <div className=" relative xl:w-[55%] p-2 ">
            <div className="absolute  -left-[45px] -top-[27px] z-[60] ">
                <p className='font-bold text-blue-700 ' >registered university</p>
                <Image className=' ml-[17px]  -rotate-45  ' height={50} width={50} src="/images/icons/arrow.png" alt="arrow" />
            </div>
            <Marquee pauseOnHover gradient gradientColor='inherit' speed={30} >
                {unis.map((item, index)=>(
                    <div key={index} className=' min-w-[100px] min-h-[100px] object-cover p-3 mx-7 ' >
                        <Image src={item.logo} alt={item.name} height={100} width={100} className=' ' />
                    </div>
                ))}
            </Marquee>
        </div>
    </div>
  )
}

export default Unilist
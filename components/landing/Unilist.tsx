import Image from 'next/image';
import React from 'react'
import Marquee from "react-fast-marquee";

const Unilist = () => {

    const unis = [
        {
            name: "covenant university",
            logo: "/images/logo/cu.png"
        }, {
            name: "university of nigeria",
            logo: "/images/logo/unn (2).png"
        }, {
            name: "University of lagos",
            logo: "/images/logo/unilag.png"
        }, {
            name: "babcock university",
            logo: "/images/logo/Babcock.jpg"
        },
        {
            name: "landmark university",
            logo: "/images/logo/landmark.png"
        }, {
            name: "landmark university",
            logo: "/images/logo/landmark.png"
        },

    ]
    return (
        <div className='flex py-10 justify-center overflow-hidden'>
            <div className="relative xl:w-[40%] p-2">
                <div className="absolute -left-[45px] -top-[27px] z-[60]">
                    <p className='font-bold text-blue-700'>Registered University</p>
                    <Image className='ml-[17px] -rotate-45' height={50} width={50} src="/images/icons/arrow.png" alt="arrow" />
                </div>
                <Marquee className='border rounded-xl py-2 h-[135px] overflow-hidden' pauseOnHover gradient={false} speed={30}>
                    {unis.map((item, index) => (
                        <div key={index} className='flex justify-center border-r items-center w-full h-[150px] p-3 mx-7'>
                            <div className='relative w-[140px] h-[110px] object-cover py-3'>
                                <Image src={item.logo} alt={item.name} layout='fill' objectFit='contain' />
                            </div>
                        </div>
                    ))}
                </Marquee>
            </div>
        </div>
    )
}

export default Unilist
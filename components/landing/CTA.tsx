import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GetStartedButton from '../ui/btn/GetStartedButton';
import { useSession } from 'next-auth/react';

gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
  const session = useSession();
  const textRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      [textRef.current, buttonRef.current],
      { opacity: 0, y: 30 }, // Start state: invisible and slightly below
      {
        opacity: 1,
        y: 0,
        ease: 'power2.out',
        stagger: 0.2, // Stagger the animations of each element
        duration: 1, // Duration of the animation
      }
    );
  }, []);

  return (
    <div className='flex justify-center items-center w-full h-[70dvh]'>
      <div className='w-[50%] flex justify-center text-center flex-col items-center'>
        <h1 ref={textRef} className='text-white text-2xl mb-5'>
          Discover your IQ, explore top universities, and join the Unirank community today. Click below to get started!
        </h1>
        <GetStartedButton ref={buttonRef} session={session} />
      </div>
    </div>
  );
};

export default CTA;

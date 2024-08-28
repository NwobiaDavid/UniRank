import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const circleRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
//     gsap.fromTo(circleRef.current, 
//       { scale: 0, opacity: 0 }, // Start state: invisible and small
//       { 
//         scale: 35, // End state: large enough to cover the screen
//         opacity: 1,
//         ease: 'power1.inOut',
//         scrollTrigger: {
//           trigger: ".mainsec",
//           start: 'top+=10% bottom', // Adjust start and end points as needed
//           end: 'bottom+=20% center',
//           scrub: true,
//         },
//       }
//     );

    gsap.to(textRef.current, 
        { 
          color: "white", 
          scrollTrigger: {
            trigger: ".mainsec",
            start: 'top+=10% bottom', // Adjust start and end points as needed
            end: 'bottom+=40% center',
            scrub: true,
          },
        }
      );
    }, []);

  return (
    <div className="w-full mainsec overflow-hidden h-[60dvh] relative">
      <div className="w-full text-opacity-100 text-center h-full justify-center items-center flex">
        <p ref={textRef} className=" w-[90%] xl:w-[50%] z-[90] text-lg xl:text-2xl font-semibold xl:font-bold text-center">
        Unirank is dedicated to empowering students, parents, and educators by providing transparent, data-driven rankings of Nigerian universities based on student IQ. We aim to foster informed decisions, promote academic excellence, and elevate the standards of higher education across the nation.
        </p>
      </div>
      {/* <div
        ref={circleRef}
        className="w-20 h-20 bg-black rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      ></div> */}
    </div>
  );
}

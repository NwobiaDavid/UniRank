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
        <p ref={textRef} className="w-[50%] z-[90] text-xl font-bold text-center">
          Many students are unaware of their intellectual strengths and weaknesses. Traditional IQ tests are often inaccessible, costly, or not engaging enough. Without a way to measure and compare their cognitive abilities, students miss out on opportunities for self-improvement and academic growth.
        </p>
      </div>
      {/* <div
        ref={circleRef}
        className="w-20 h-20 bg-black rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      ></div> */}
    </div>
  );
}

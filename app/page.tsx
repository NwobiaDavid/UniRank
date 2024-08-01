/* eslint-disable @next/next/no-async-client-component */
"use client"

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import GetStartedButton from "../components/ui/btn/GetStartedButton";
import { getServerSession } from "next-auth";
import Nav from "@/components/ui/Nav";
import Footer from "@/components/ui/Footer";
import { useSession } from "next-auth/react";
import Unilist from "@/components/landing/Unilist";
import Problem from "@/components/landing/Problem";
import About from "@/components/landing/About";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Features from "@/components/landing/Features";
import Faqs from "@/components/landing/Faqs";
import CTA from "@/components/landing/CTA";
import Footerr from "@/components/landing/Footerr";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  // const session = (await getServerSession()) || {};
  const session = useSession();

  const initialLeaderboard = [
    { id: 1, name: "Nwobia david", rank: "1st", uni: "covenant university" },
    { id: 2, name: "adenyin ola", rank: "2nd", uni: "university of lagos" },
    { id: 3, name: "oluwani tumioke", rank: "3rd", uni: "university of benin" }
  ];

  const [leaderboard, setLeaderboard] = useState(initialLeaderboard);
  const [shuffleKey, setShuffleKey] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  useEffect(() => {
    const updateLeaderboard = () => {
      const shuffled = [...leaderboard].sort(() => 0.5 - Math.random());
      const updated = shuffled.map((item, index) => ({
        ...item,
        rank: `${index + 1}${index === 0 ? "st" : index === 1 ? "nd" : "rd"}`
      }));
      setLeaderboard(updated);
      setShuffleKey(prevKey => prevKey + 1);
    };

    const intervalId = setInterval(updateLeaderboard, 15000);
    return () => clearInterval(intervalId);
  }, [leaderboard]);


  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      }
    }
  };
  const itemVariants = {
    initial: { opacity: 0, x: 50 },
    animate: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.5 },
    }),
    exit: { opacity: 0, x: -50, transition: { duration: 0.5 } },
  };


  const circleRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(circleRef.current,
      { scale: 0, opacity: 0 }, // Start state: invisible and small
      {
        scale: 3105, // End state: large enough to cover the screen
        opacity: 1,
        ease: 'power1.inOut',
        scrollTrigger: {
          trigger: ".mainsec",
          start: 'top center', // Adjust start and end points as needed
          end: 'bottom+=20% center',
          scrub: true,
        },
      }
    );

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
    <div className="bg-neutral-100 max-w-screen  overflow-hidden relative   ">
      <Nav />
      <main className="flex w-full min-h-screen  flex-col items-center justify-between ">

        <section className=" flex flex-col overflow-x-hidden justify-center items-center h-full w-full " >
          <div className="xl:h-[80dvh] h-[105dvh] pt-20 p-5 xl:p-24 flex xl:w-[73%] justify-around lg:flex-row flex-col items-center">

            <div className="  w-full lg:w-[50%] lg:mr-5 lg:py-20 pt-20 pb-16  px-2 lg:px-5">
              <div className="mb-6 flex flex-col justify-center text-center lg:text-left items-center">
                <h2 className=" text-5xl mb-2 lg:mb-0 xl:text-7xl font-bold">
                  Are You Among the <span className="text-blue-600">Top 1%?</span>
                </h2>
                <p className=" text-lg  lg:text-xl mt-1">
                  Discover your intellectual capabilities with UniRank. Take our scientifically designed IQ tests,
                </p>
              </div>
              <div className="  flex  lg:justify-start justify-center " >
                <GetStartedButton session={session} />
              </div>
            </div>

            <div className=" w-full lg:w-[50%] h-full flex justify-center items-center p-2">
              <motion.div className="relative w-full h-[60%] lg:h-[25%] -mb-20 flex flex-col justify-end items-end">
                <AnimatePresence key={shuffleKey}>
                  {leaderboard.map((item, index) => (
                    <motion.div
                      key={item.id}
                      custom={index}
                      variants={itemVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className={`  p-3 lg:p-4 absolute shadow-sm  duration-200 lg:text-base text-sm bg-white  border rounded-xl flex w-full justify-around items-center 
                        ${index === 0 ? `scale-[1.4]  ${isMobile ? " left-[1rem]  " : " left-[4rem]  "} bottom-[100%]  ` :
                        index === 1 ? `scale-[22] ${isMobile ? " left-[0.5rem]  " : " left-[2rem]  " }  bottom-[50%] `:
                          "scale-[1.1]  bottom-0 "
                        }`}
                    >
                      <div className="w-1/3">
                        <h3 className="font-semibold capitalize ">{item.name}</h3>
                      </div>
                      <div className="w-1/3 flex justify-center capitalize ">{item.uni}</div>
                      <div
                        className={`w-1/3 ${item.rank === "1st"
                          ? "text-[#FFD700]"
                          : item.rank === "2nd"
                            ? "text-[#C0C0C0]"
                            : "text-[#CD7F32]"
                          } flex justify-end font-bold`}
                      >
                        {item.rank}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
          <section>
            <Unilist />
          </section>


          <div
            ref={circleRef}
            className="w-20 h-20 bg-neutral-900  rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          ></div>


          <section className=" mainsec w-full " >
            <About />
          </section>

        </section>


        <section className="p-24 z-10 " >
          <Problem />
        </section>


        <section style={{display: "unset"}} >
          <section className=" sticky top-0  w-full " >
            {/* <div className="bg-red-500  p-10 w-full ">
              hello
            </div> */}
            {/* <Features /> */}
          </section>
        </section>

        <section className=" w-full z-10  " >
          <Faqs />
        </section>
        <section className=" w-full z-10  " >
          <CTA />
        </section>

      </main>
      <section className=" w-full z-10  ">
        <Footerr />
      </section>
    </div>
  );
}

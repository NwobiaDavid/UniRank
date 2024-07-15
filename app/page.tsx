/* eslint-disable @next/next/no-async-client-component */
"use client"

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import GetStartedButton from "../components/ui/btn/GetStartedButton";
import { getServerSession } from "next-auth";
import Nav from "@/components/ui/Nav";
import Footer from "@/components/ui/Footer";
import { useSession } from "next-auth/react";

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

  return (
    <div className="bg-neutral-100">
      <Nav />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="h-[60dvh] flex xl:w-[70%] justify-around items-center">
          <div className="w-[50%] mr-5 py-20 px-5">
            <div className="mb-10 flex flex-col justify-center items-center">
              <h2 className="text-7xl font-bold">
                Are You Among the <span className="text-blue-600">Top 1%?</span>
              </h2>
              <p className="text-xl mt-1">
                Discover your intellectual capabilities with UniRank. Take our scientifically designed IQ tests,
              </p>
            </div>
            <div>
              <GetStartedButton session={session} />
            </div>
          </div>

          <div className="w-[50%] h-full flex justify-center items-center p-2">
            <motion.div 
            
            className="relative w-full xl:h-[25%] flex flex-col justify-end items-end">
              <AnimatePresence key={shuffleKey}>
                {leaderboard.map((item, index) => (
                  <motion.div
                    key={item.id}
                    custom={index}
                    variants={itemVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className={`p-4  shadow-sm  bg-white absolute  border rounded-xl flex w-full justify-around items-center ${
                      index === 0 ? "scale-[1.4] left-[4rem] bottom-[100%]  " :
                      index === 1 ? "hover:scale-110 left-[2rem]  bottom-[50%] " :
                      "scale-[1.1]  bottom-0 "
                    }`}
                  >
                    <div className="w-1/3">
                      <h3 className="font-semibold capitalize ">{item.name}</h3>
                    </div>
                    <div className="w-1/3 flex justify-center capitalize ">{item.uni}</div>
                    <div
                      className={`w-1/3 ${
                        item.rank === "1st"
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

        <section id="problem">
          <p>
            Many students are unaware of their intellectual strengths and weaknesses. Traditional IQ tests are often inaccessible, costly, or not engaging enough. Without a way to measure and compare their cognitive abilities, students miss out on opportunities for self-improvement and academic growth.
          </p>
        </section>

        <section id="why-unirank">
          <h2>Why Use UniRank?</h2>
          <ul>
            <li><strong>Accurate and Engaging:</strong> Our IQ tests are scientifically designed to be both accurate and engaging.</li>
            <li><strong>Competitive Edge:</strong> Compete with peers and see how you rank among university students.</li>
            <li><strong>Personal Growth:</strong> Identify areas for improvement and track your progress over time.</li>
            <li><strong>Accessible and Affordable:</strong> Free access to high-quality IQ testing.</li>
            <li><strong>Privacy and Security:</strong> Your data is protected with top-notch security measures.</li>
          </ul>
        </section>

        <section id="how-it-works">
          <h2>How It Works</h2>
          <ol>
            <li><strong>Sign Up:</strong> Create an account in a few easy steps.</li>
            <li><strong>Take the Test:</strong> Answer a series of questions within the time limit.</li>
            <li><strong>View Your Score:</strong> See your IQ score and where you rank among your peers.</li>
            <li><strong>Improve:</strong> Take tests regularly to track your progress and improve your ranking.</li>
          </ol>
        </section>

        <section id="faq">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-item">
            <h3>Is UniRank free to use?</h3>
            <p>Yes, UniRank is completely free for all university students.</p>
          </div>
          <div className="faq-item">
            <h3>How are the IQ tests designed?</h3>
            <p>Our IQ tests are developed by experts to ensure accuracy and engagement. They are scientifically designed to measure various cognitive abilities.</p>
          </div>
          <div className="faq-item">
            <h3>How is my data protected?</h3>
            <p>We use top-notch security measures to protect your data and ensure your privacy.</p>
          </div>
          <div className="faq-item">
            <h3>Can I see how I rank compared to others?</h3>
            <p>Yes, after completing the test, you can see where you rank among other university students.</p>
          </div>
        </section>

        <div className="h-[60vh] flex justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-7xl mb-5">Ready to Challenge Yourself?</h2>
            <GetStartedButton session={session} />
          </div>
        </div>

        <footer>
          <p>&copy; 2024 UniRank. All rights reserved.</p>
          <nav>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
          </nav>
        </footer>
      </main>
      <Footer />
    </div>
  );
}

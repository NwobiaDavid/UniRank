"use client"

import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const Features = () => {
    const controls = useAnimation();
    const [ref1, inView1] = useInView({ triggerOnce: false, threshold: 0.5 });
    const [ref2, inView2] = useInView({ triggerOnce: false, threshold: 0.5 });
    const [ref3, inView3] = useInView({ triggerOnce: false, threshold: 0.5 });

    useEffect(() => {
        if (inView1) {
            controls.start('visible');
        }
    }, [controls, inView1]);

    useEffect(() => {
        if (inView2) {
            controls.start('visible');
        }
    }, [controls, inView2]);

    useEffect(() => {
        if (inView3) {
            controls.start('visible');
        }
    }, [controls, inView3]);

    return (
        <div className=" h-full relative  justify-between flex">
            <div className="w-[50%] h-full flex items-center justify-center bg-gray-200">
                <motion.div
                    className={`text-9xl transition-opacity duration-500 ${inView1 ? 'opacity-100' : 'opacity-0'}`}
                >
                    😊
                </motion.div>
                <motion.div
                    className={`text-9xl transition-opacity duration-500 absolute ${inView2 ? 'opacity-100' : 'opacity-0'}`}
                >
                    🚀
                </motion.div>
                <motion.div
                    className={`text-9xl transition-opacity duration-500 absolute ${inView3 ? 'opacity-100' : 'opacity-0'}`}
                >
                    🌟
                </motion.div>
            </div>
            <div className="w-[50%] bg-red-200 snap-y snap-mandatory h-screen overflow-y-scroll">
                <div ref={ref1} className="snap-start h-screen flex items-center justify-center bg-white">
                    <p>Feature 1 Description</p>
                </div>
                <div ref={ref2} className="snap-start h-screen flex items-center justify-center bg-white">
                    <p>Feature 2 Description</p>
                </div>
                <div ref={ref3} className="snap-start h-screen flex items-center justify-center bg-white">
                    <p>Feature 3 Description</p>
                </div>
            </div>
        </div>
    );
};

export default Features;

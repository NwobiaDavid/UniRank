/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import useFetchData from "@/lib/useFetchSessionData";
import { useEffect, useState } from 'react';
import { Session } from "next-auth";  

interface GetStartedButtonProps {
    session: Session | null;
}

const GetStartedButton: React.FC<GetStartedButtonProps> = ({ session }) => {
    const router = useRouter();
    const [val, setVal] = useState<string | undefined>(undefined);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const data = await useFetchData();
            console.log("--data type- " + data);
            if (typeof data === 'string') {
                setVal(data);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768); // You can adjust the threshold as needed
        };

        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);
        
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleGetStarted = async () => {
        try {
            console.log("-----val " + val);
            console.log("-----session " + JSON.stringify(session));
            if (val !== undefined && val !== null) {
                if (val === "true") {
                    router.push("/home");
                } else {
                    router.push("/onboarding");
                }
            } else {
                await signIn();
            }
        } catch (error) {
            console.error("Error during signin:", error);
        }
    };

    return (
        <button 
            onClick={handleGetStarted} 
            className="hover:bg-black md:text-base text-sm hover:text-white active:scale-95 duration-200 hover:border-opacity-100 border-opacity-65 border rounded-lg border-slate-800 bg-white px-2 md:px-4 py-2 flex items-center"
        >
            <span>
                {session ? (isMobile ? "Let's Start" : "Take the Test") : "HOME"}
            </span>
        </button>
    );
}

export default GetStartedButton;

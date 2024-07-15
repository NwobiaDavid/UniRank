/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { signIn } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import useFetchData from "@/lib/useFetchSessionData";
import { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import { Session } from "next-auth";  

interface GetStartedButtonProps {
    session: Session | null;
}

const GetStartedButton: React.FC<GetStartedButtonProps> = ({ session }) => {
    // const plausible = usePlausible();
    const router = useRouter();
    // const { data: session } = useSession();
    const [val, setVal] = useState<string | undefined>(undefined);

    useEffect(() => {
        const fetchData = async () => {
            const data = await useFetchData();
            console.log("--data type- "+data);
            if (typeof data == 'string') {
                setVal(data);
            }
        };

        fetchData();
    }, []);


    const handleGetStarted = async () => {
        try {
            console.log("-----val "+val);
            console.log("-----session "+JSON.stringify(session));
            if (val !== undefined && val !== null) {
                // if (session) {
                    if (val === "true" ) {
                        router.push("/home");
                    } else {
                        router.push("/onboarding");
                    }
                // }
            } else {
                await signIn();
            }
        } catch (error) {
            console.error("Error during signin:", error);
        }
    };

    return (
        <button onClick={handleGetStarted} className="hover:bg-black hover:text-white active:scale-95  duration-200 hover:border-opacity-100 border-opacity-65 border rounded-lg border-slate-800 bg-white px-4 py-2 flex items-center">
            <span>
               {session ?  "Take the Quiz" : "HOME"}
            </span>
        </button>
    );
}

export default GetStartedButton;

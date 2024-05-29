/* eslint-disable react-hooks/rules-of-hooks */
"use client"

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Page = () => {
    const [username, setUsername] = useState("");
    const [university, setUniversity] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const session = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session?.data?.user?.name) {
            setUsername(session.data.user.name);
        }
    }, [session]);

    console.log("sess--> " + JSON.stringify(session?.data?.user));

    const handleSubmit = async () => {
        if (!username.trim()) {
            alert("Please your username can't be empty");
            return;
        }

        if (!university.trim()) {
            alert("Please type the name of your University");
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(`/api/auth/onboarding`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, university }),
            });

            const responseData = await response.json();

            if (response.status !== 201) {
                throw new Error(responseData.message);
            }

            setIsLoading(false);
            router.push('/home');
        } catch (error) {
            setIsLoading(false);
        }
    };

    return (
        <div className='max-h-[100dvh]'>
            <div className='h-[7%] p-5 border-b flex justify-center items-center'>
                <Link className='text-5xl font-bold opacity-75 ' href={"/"}>UniRank</Link>
            </div>
            {session && session?.data?.user ? (
                <div className="h-[93%]  ">
                    <div className='h-[10%] flex justify-end items-center px-20 py-4 '>
                        <button className='border rounded-lg py-3 px-5 ' onClick={handleSubmit}>
                            {isLoading ? "Continuing..." : "Continue"}
                        </button>
                    </div>
                    <div className='h-[90%] w-full flex flex-col justify-center items-center'>
                        <h2 className='text-5xl font-semibold mb-7'>Complete your profile</h2>
                        <div className="w-[30%] px-3 ">
                            <input
                                className='p-3 w-full mb-3 outline-none border rounded-xl'
                                placeholder='username'
                                onChange={(e) => setUsername(e.target.value)}
                                value={username}
                                type="text"
                            />
                            <input
                                className='p-3 w-full rounded-xl outline-none border  '
                                placeholder='university'
                                onChange={(e) => setUniversity(e.target.value)}
                                value={university}
                                type="text"
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <div className='h-full p-6 flex justify-center items-center w-full ' >
                    loading...
                </div>
            ) }

        </div>
    );
}

export default Page;

/* eslint-disable react-hooks/rules-of-hooks */
"use client"

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Select , SelectItem, Spinner} from "@nextui-org/react";
import { FaPlus } from 'react-icons/fa';

const Page: React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const [university, setUniversity] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const session = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session?.data?.user?.name) {
            setUsername(session.data.user.name);
        }
    }, [session]);

    // console.log("sess--> " + JSON.stringify(session?.data?.user));

    const handleSubmit = async () => {
        if (!username.trim()) {
            alert("Please your username can't be empty");
            return;
        }

        if (!university.trim() || university === "add-new") {
            alert("Please select or add the name of your University");
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

    const handleUniversityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        console.log("option value---> "+value);
        if (value === "add-new") {
            router.push('/onboarding/university');
        } else {
            setUniversity(value);
        }
    };

    return (
        <div className='min-h-[100dvh] bg-[#F0ECE5] '>
            <div className='h-[7%] p-5 border-b border-[#B6BBC4] flex justify-center items-center'>
                <Link className='text-5xl font-bold opacity-75 ' href={"/"}>UniRank</Link>
            </div>
            {session && session?.data?.user ? (
                <div className="h-[93%]  ">
                    <div className='h-[10%] flex justify-center lg:justify-end items-center lg:px-20 py-4 '>
                        <button className=' bg-[#161A30] text-white hover:text-opacity-95 duration-200 text-opacity-80 rounded-lg py-3 px-5 ' onClick={handleSubmit}>
                            {isLoading ? "Continuing..." : "Continue"}
                        </button>
                    </div>
                    <div className='h-[90%] w-full flex flex-col justify-center items-center'>
                        <h2 className='text-5xl text-center font-semibold mb-7'>Complete your profile</h2>
                        <div className="xl:w-[30%] lg:w-[40%] w-[90%] px-3 ">
                            <input
                                className='p-3 w-full mb-3 outline-none border-[#B6BBC4] border rounded-xl'
                                placeholder='username'
                                onChange={(e) => setUsername(e.target.value)}
                                value={username}
                                type="text"
                            />
                            <Select
                                className=' rounded-2xl w-full outline-none bg-[#B6BBC4] '
                                label='Select your university'
                                placeholder='Pick your University'
                                onChange={handleUniversityChange}
                                value={university}
                            >
                                <SelectItem key="University of Lagos">University of Lagos</SelectItem>
                                <SelectItem key="Obafemi Awolowo University">Obafemi Awolowo University</SelectItem>
                                <SelectItem key="University of Ibadan">University of Ibadan</SelectItem>
                                <SelectItem key="Covenant University">Covenant University</SelectItem>
                                <SelectItem key="Ahmadu Bello University">Ahmadu Bello University</SelectItem>
                                <SelectItem key="add-new">
                                    <div className="flex items-center">
                                        <FaPlus className="mr-2" /> Add your university
                                    </div>
                                </SelectItem>
                            </Select>
                        </div>
                    </div>

                    <div className="mt-10">
                        <div className="flex items-center justify-center ">
                            <div className="flex items-center justify-center shadow-md bg-[#31304D] text-white  rounded-xl py-2 px-4 ">
                                <Image className=' w-[60px] h-[60px] rounded-full border-2 border-white ' width={60} height={60}  src={session?.data?.user?.image || ""} alt="profile pic" />
                                <div className='ml-2  ' >
                                    <h2 className=' font-semibold ' > {username}</h2>
                                    <h2> {university}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='h-full p-6 flex justify-center items-center w-full ' >
                     <Spinner label="Loading..." color="default" />
                </div>
            ) }

        </div>
    );
}

export default Page;

/* eslint-disable react-hooks/rules-of-hooks */
"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const AddUniversity: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [university, setUniversity] = useState<string>("");
    const [reason, setReason] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const router = useRouter();

    const handleSubmit = async () => {
        if (!email.trim() || !university.trim() || !reason.trim()) {
            alert("All fields are required");
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(`/api/auth/onboarding/add-university`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, university, reason }),
            });

            const responseData = await response.json();

            if (response.status !== 201) {
                throw new Error(responseData.message);
            }

            setIsLoading(false);
            alert("Your request has been submitted");
            router.push('/');
        } catch (error) {
            setIsLoading(false);
        }
    };

    return (
        <div className=' min-h-[100dvh] bg-[#F0ECE5]  '>
            <div className='h-[7%] p-5 border-b border-[#B6BBC4] flex justify-center items-center'>
                <Link className='text-5xl font-bold opacity-75 ' href={"/"}>UniRank</Link>
            </div>
            <div className='h-[93%] mt-3 w-full flex flex-col justify-center items-center'>
                <h2 className='text-5xl font-semibold mb-7'>Request to add a new university</h2>
                <div className="w-[30%] px-3 ">
                    <input
                        className='p-3 w-full mb-3 outline-none border-[#B6BBC4] border rounded-xl'
                        placeholder='Email'
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        type="email"
                    />
                    <input
                        className='p-3 w-full mb-3 outline-none border-[#B6BBC4] border rounded-xl'
                        placeholder='University Name'
                        onChange={(e) => setUniversity(e.target.value)}
                        value={university}
                        type="text"
                    />
                    <textarea
                        className='p-3 w-full mb-3 outline-none border-[#B6BBC4] border rounded-xl'
                        placeholder='Reason for adding'
                        onChange={(e) => setReason(e.target.value)}
                        value={reason}
                        rows={4}
                    />
                    <button className=' shadow-md bg-[#161A30]  hover:text-opacity-95 duration-200 text-opacity-80  text-white rounded-lg py-3 px-5 w-full' onClick={handleSubmit}>
                        {isLoading ? "Submitting..." : "Submit"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddUniversity;

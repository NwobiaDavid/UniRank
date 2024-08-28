"use client";
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { usePaystackPayment } from 'react-paystack';

const Page: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [numtry, setNumtry] = useState(1);
  const [error, setError] = useState("");
  const [publicKey, setPublicKey] = useState("");

  const session = useSession();

  // useEffect(() => {
  //   const fetchPublicKey = () => {
  //     const envPublicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;

  //     if (!envPublicKey) {
  //       console.warn("Paystack public key is undefined");
  //       setError("Payment system is currently unavailable. Please try again later.");
  //       setPublicKey("undefined");
  //     } else {
  //       setError(""); 
  //       setPublicKey(envPublicKey);
  //     }
  //   };

  //   fetchPublicKey();

  //   const interval = setInterval(fetchPublicKey, 1000); 

  //   return () => clearInterval(interval);
  // }, []);

  // console.log("Paystack public key:", publicKey);


  useEffect(() => {
    async function getScore() {
      try {
        setLoading(true);
        const response = await fetch(`/api/util/me`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const responseData = await response.json();
        setScore(responseData?.user?.score);
        setNumtry(responseData?.user?.numtry || 1);
        setError("");

      } catch (error: any) {
        console.error("Error fetching data:", error);
        setError(error?.message);
      } finally {
        setLoading(false);
      }
    }

    getScore();
  }, []);

  const config = {
    reference: new Date().getTime().toString(),
    email: session.data?.user?.email,
    amount: 10000,
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
  };


  // console.log("Paystack public key:", publicKey);


  const onSuccess = (reference: any) => {
    console.log(reference);
    router.push('/quiz');
  };

  const onClose = () => {
    console.log('Transaction was not completed, window closed.');
  };

  const initializePayment = usePaystackPayment(config);

  const startQuiz = () => {
    // if (!publicKey) {
    //   alert("Payment system is currently unavailable. Please try again later.");
    //   return;
    // }

    if (numtry > 2) {
      initializePayment(onSuccess, onClose);
    } else {
      router.push('/quiz');
    }
  };

  return (
    <div className='w-full h-[80dvh] flex flex-col justify-center items-center p-2 xl:px-24'>
      <div className='h-[10%] w-[90%] border-b border-[#31304D] flex justify-between md:justify-around items-center p-2 xl:p-10'>
        <h2 className='font-bold mr-1 rounded-lg p-1 text-2xl'>Home</h2>
        <h2 className='font-semibold p-2 border-[#31304D] border uppercase rounded-lg px-3 text-lg ml-1'>
          Score: <span className="text-red-500">{score}</span>
        </h2>
      </div>

      <div className='h-[90%] w-full p-2 xl:p-24 flex justify-center items-center flex-col'>
        {/* {error && <p className="text-red-500 mb-4">{error}</p>} */}
        <div className="mb-16 w-full md:w-[70%] xl:w-[80%] text-center flex flex-col justify-center items-center">
          <div className='flex w-[90%] xl:w-[40%] mb-4 text-lg items-center border border-green-500 bg-green-200 p-2 rounded-lg justify-center'>
            <span className='font-semibold capitalize'>Time limit: <span className='font-normal text-green-700'>10mins</span></span>
          </div>

          <div className='w-full'>
            <h1 className="text-base xl:text-lg"> Welcome to UniRank! Before you begin, please review the rules to ensure a smooth testing experience. Best of luck—give it your all and make the most of this opportunity!</h1>
            {/* <h1 className="text-base xl:text-lg">It is advisable to read through the rules before you take the test.</h1>
            <h1 className="text-base xl:text-lg">Good luck, and give it your best shot!</h1> */}
          </div>
        </div>

        <div className="flex gap-3 items-center">
          <Link href={"/rules"} className='py-2 px-3 text-sm rounded-lg border border-[#161A30] font-semibold hover:bg-[#161A30] hover:text-white duration-200 active:scale-95'>
            Rules
          </Link>

          <button disabled={loading} className='py-2 px-3 text-sm rounded-lg text-white bg-[#161A30] font-semibold hover:bg-opacity-85 duration-200 active:scale-95' onClick={startQuiz}>
            {numtry > 1 ? "Retake Test" : "Take Test"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Page;

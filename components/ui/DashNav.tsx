import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react'
import { TbLogout2 } from "react-icons/tb";

const DashNav = () => {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await signOut();
            router.push("/")
        } catch (error) {
            console.error("Error during signout:", error);
        }
    };

  return (
    <div className=' w-full h-full flex justify-center items-center ' >
      <div className=' w-[80%] pl-3 ' >
        <h1 className=' text-2xl font-bold opacity-80 ' >UniRank</h1>
      </div>
      <div className=' w-[20%] px-2 ' >
<div className='border rounded-full  border-[#31304D] flex justify-center items-center w-[50px] h-[50px] p-2 text-xl ' >
    <TbLogout2 />
</div>
      </div>
    </div>
  )
}

export default DashNav

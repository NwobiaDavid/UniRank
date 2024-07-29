"use client"

import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { AiFillHome, AiFillBell } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { IoAdd } from "react-icons/io5";
import { MdExplore, MdHome, MdLeaderboard } from "react-icons/md";
import { GrAdd } from "react-icons/gr";

// const getUnreadNotifications = async () => {
//     try {
//         const response = await fetch("/api/partners/notifications/unreadCount");
//         if (!response.ok) {
//             throw new Error("Failed to fetch unread notifications count");
//         }
//         const data = await response.json();
//         return data.unreadCount;
//     } catch (error) {
//         console.error("Error fetching unread notifications count:", error);
//         return 0;
//     }
// };


const ResSideBar = () => {
    const router = useRouter();
    const pathname = usePathname();

    const session = useSession();

    // const [unreadCount, setUnreadCount] = useState(0);

    // useEffect(() => {
    //     const fetchUnreadNotificationsCount = async () => {
    //         const count = await getUnreadNotifications();
    //         setUnreadCount(count);
    //     };
    //     fetchUnreadNotificationsCount();
    // }, []);

    const sidebarLinks = [
        {
            route: "/home",
            label: "Home",
            icon: <MdHome />
        },
        {
            route: "/leaderboard",
            label: "LeaderBoard",
            icon: <MdLeaderboard />
        }        
    ];
    return (
        <div className=" flex relative text-white  border-t p-3 h-full w-full justify-around items-center " >

            {sidebarLinks.map((link) => {
                const isActive =
                    (pathname.includes(link.route) && link.route.length > 1) ||
                    pathname === link.route;

                return (
                    <Link key={link.label} className=" ml-2 " href={link.route} >
                        <div className={` p-4  rounded-full text-center cursor-pointer hover:bg-gray-300 duration-200 font-semibold ${isActive && ' bg-[#F0ECE5]  text-black'}`}>
                            <div className="flex justify-center relative ">
                                <span className="text-2xl xl:mr-2 ">{link.icon}</span>
                            </div>
                        </div>
                    </Link>
                );
            })}

<div className='mr-2 rounded-full border border-[#F0ECE5]  overflow-hidden relative p-4 '>
                <Image className='w-full h-full object-cover' fill={true} alt="your profile picture" src={session.data?.user?.image } />
              </div>
        </div>
    )
}

export default ResSideBar
"use client"

import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { AiFillHome, AiFillBell } from "react-icons/ai";
import { FaBell, FaHome, FaUser } from "react-icons/fa";
import LogoutButton from "./btn/LogoutButton";
import { useSession } from "next-auth/react";
import { VscFeedback } from "react-icons/vsc";
import { MdExplore } from "react-icons/md";
import { IoAdd, IoAddCircleOutline, IoHomeOutline, IoNavigateCircleOutline, IoNotificationsOutline, IoPersonOutline } from "react-icons/io5";
import { GrAdd } from "react-icons/gr";
import { useEffect, useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";

const getUnreadNotifications = async () => {
    try {
      const response = await fetch("/api/partners/notifications/unreadCount");
      if (!response.ok) {
        throw new Error("Failed to fetch unread notifications count");
      }
      const data = await response.json();
      return data.unreadCount;
    } catch (error) {
      console.error("Error fetching unread notifications count:", error);
      return 0;
    }
  };

const SideBar = () => {
    const router = useRouter();
    const pathname = usePathname();
    // const session = getServerSession();

    const session = useSession();

    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
    const fetchUnreadNotificationsCount = async () => {
      const count = await getUnreadNotifications();
      setUnreadCount(count);
    };
    fetchUnreadNotificationsCount();
  }, []);

    const sidebarLinksone = [
        {
            route: "/home",
            label: "Home",
            icon: <IoHomeOutline />
        },
        {
            route: "/leadership-board",
            label: "Leadership",
            icon: <IoNavigateCircleOutline />
        },
        {
            route: "/feedback",
            label: "Feedback",
            icon: <VscFeedback />
        },
    ];

    const sidebarLinkstwo = [
        {
            route: "/profile/me",
            label: "Profile",
            icon: <FaUser />
        },
        {
            route: "/dashboard",
            label: "Home",
            icon: <AiFillHome />
        },
    ];

    return (
        <div className=" py-3 pr-3 flex flex-col justify-between border-r h-[90%] w-full " >

            <div>
                {sidebarLinksone.map((link) => {
                    const isActive =
                        (pathname.includes(link.route) && link.route.length > 1) ||
                        pathname === link.route;
                    // if (link.route === '/profile') link.route = `${link.route}/${session?.user.}`;
                    return (
                        <Link key={link.label} href={link.route} >
                            <div className={` px-3 py-4 mb-2 rounded-r-full text-center cursor-pointer duration-200 font-semibold ${isActive ? ' bg-[#8576FF] hover:bg-[#584bb8] text-white' : ' hover:bg-gray-300'}`}>
                                <div className="flex justify-center  ">
                                    <span className="text-2xl w-[30%] flex justify-end mr-2 ">{link.icon}</span>
                                    <p className=" max-lg:hidden flex tracking-wider w-[70%] ">  {link.label}</p>
                                    {link.label === "Notifications" && unreadCount > 0 && (
                                        <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 ml-[6px] ">{unreadCount}</span>
                                    )}
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>

            <div>
            <div className="  " >
                    <Link href="/post">
                        <div className={` px-3 py-4 mb-2 rounded-r-full text-center cursor-pointer  duration-200 font-semibold ${pathname.includes('/post') ? 'bg-[#8576FF] hover:bg-[#8576FF] text-white' : 'hover:bg-gray-300'}`}>
                            <div className="flex justify-center  ">
                                <span className="text-2xl mr-2 w-[30%] flex justify-end "><IoAddCircleOutline /></span>
                                <p className=" max-lg:hidden tracking-wider flex w-[70%] ">Post</p>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="  " >
                    <Link href="/profile/me">
                        <div className={` px-3 py-4 mb-2 rounded-r-full text-center cursor-pointer  duration-200 font-semibold ${pathname.includes('/profile/') ? 'bg-[#8576FF] hover:bg-[#8576FF] text-white' : 'hover:bg-gray-300'}`}>
                            <div className="flex justify-center  ">
                                <span className="text-2xl mr-2 w-[30%] flex justify-end "><IoPersonOutline /></span>
                                <p className=" max-lg:hidden tracking-wider flex w-[70%] ">Profile</p>
                            </div>
                        </div>
                    </Link>
                </div>
                <div>
                    <div className="pl-3" >
                        <div className={` px-3 mb-2 w-full rounded-full text-center cursor-pointer duration-200 font-semibold ${session ? 'bg-[#ff7676] hover:bg-[#6d3636] text-white' : ''}`}>
                            <div className="flex justify-center  ">
                                {session ? <LogoutButton /> : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideBar
"use client"

import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { AiFillHome, AiFillBell } from "react-icons/ai";
import { FaBell, FaHome, FaUser } from "react-icons/fa";
import LogoutButton from "./btn/LogoutButton";
import { signOut, useSession } from "next-auth/react";
import { VscFeedback } from "react-icons/vsc";
import { MdExplore } from "react-icons/md";
import { IoAdd, IoAddCircleOutline, IoHomeOutline, IoNavigateCircleOutline, IoNotificationsOutline, IoPersonOutline } from "react-icons/io5";
import { GrAdd } from "react-icons/gr";
import { useEffect, useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import { Skeleton } from "@nextui-org/react";
import { BsThreeDots } from "react-icons/bs";
import { TbLogout } from "react-icons/tb";

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


const SideBar = () => {
    const router = useRouter();
    const pathname = usePathname();

    const [name, setName] = useState("");
    const [img, setImg] = useState("");
    const [university, setUniversity] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [isDrop, setIsDrop] = useState(false);
    const session = useSession();

    const [unreadCount, setUnreadCount] = useState(0);

    const sidebarLinksone = [
        {
            route: "/home",
            label: "Home",
            icon: <IoHomeOutline />
        },
        {
            route: "/leader-board",
            label: "LeaderBoard",
            icon: <IoNavigateCircleOutline />
        }
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

    const handleDrop = async () => {
        setIsDrop(!isDrop);
    }

    const handleLogout = async () => {
        try {
            await signOut();
            router.push("/")
        } catch (error) {
            console.error("Error during signout:", error);
        }
    };


    useEffect(() => {
        async function getData() {
            try {
                setLoading(true);
                const response = await fetch(`/api/util/me`, {
                    headers: {
                        "Content-Type": "application/json",
                    }
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                

                const responseData = await response.json();
                setImg(responseData?.user.image)
                setName(responseData?.user.userName)
                setUniversity(responseData?.user.university)
                setError("");
            } catch (error: any) {
                console.error("Error fetching data:", error);
                setError(error?.message);
            } finally {
                setLoading(false);
            }
        }

        getData();
    }, []);

    // const handleSidebarToggle = async () => {

    // }

    return (
        <div className=" py-3 bg-slate-500 text-white pr-3 flex flex-col justify-between border-r border-y rounded-r-xl h-full w-full " >
            <div>
                <button  className=" p-4 " >
                    icon
                </button>

                <div>
                    {sidebarLinksone.map((link) => {
                        const isActive =
                            (pathname.includes(link.route) && link.route.length > 1) ||
                            pathname === link.route;
                        // if (link.route === '/profile') link.route = `${link.route}/${session?.user.}`;
                        return (
                            <Link key={link.label} href={link.route} >
                                <div className={` px-3 py-5 mb-2 rounded-r-full text-center cursor-pointer duration-200 font-semibold ${isActive ? ' bg-gray-400 text-gray-800 hover:bg-white hover:text-black' : ' hover:bg-gray-300 text-gray-700 '}`}>
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
            </div>

            <div>
                <div className="flex relative w-full justify-center text-black items-center">
                    {loading ? (
                        <div className="p-2 rounded-full flex items-center ">
                            <div>
                                <Skeleton className="flex w-[35px] h-[35px] xl:w-[50px] xl:h-[50px] rounded-full " />
                            </div>
                            <div className=" w-[150px] xl:flex hidden ml-2 flex-col gap-2">
                                <Skeleton className="h-3 w-full rounded-lg" />
                                <Skeleton className="h-3 w-full rounded-lg" />
                            </div>
                        </div>
                    ) : (

                        <div className={`p-2 rounded-full border hover:shadow-sm duration-200 flex items-center ${isDrop ? 'xl:bg-white bg-gray-200' : 'bg-white'}`}>
                            {img && (
                                <div>
                                    <Image className="rounded-full border w-[35px] h-[35px] xl:w-[50px] xl:h-[50px]" width={40} height={40} src={img} alt="profile pic" />
                                </div>
                            )}
                            <div className="ml-2 px-4 xl:block hidden">
                                <p className="font-semibold">{name}</p>
                                <p className="xl:block opacity-75 hidden">{university}</p>
                            </div>

                            <div onClick={handleDrop} className={`xl:block cursor-pointer hover:bg-gray-200 duration-200 rounded-full hidden p-3 ml-2 ${isDrop ? 'bg-gray-200' : 'bg-white'}`}>
                                <BsThreeDots />
                            </div>
                        </div>

                    )}

                    {isDrop && (
                        <div className="absolute p-2 xl:-top-[calc(100%+3px)] top-[calc(100%+2px)] right-0 flex justify-center shadow-sm items-center h-[80px] w-[250px] border rounded-xl bg-white">
                            <div onClick={handleLogout} className="ml-2 text-xl w-full hover:bg-red-800 hover:text-white duration-200 px-3 py-2 rounded-full border cursor-pointer justify-center flex items-center ">
                                <TbLogout />
                                <span className="ml-2">Logout</span>
                            </div>
                        </div>
                    )}

                    {/* <div onClick={handleLogout} className="ml-2 text-xl p-3 rounded-full border cursor-pointer flex xl:hidden">
                        <TbLogout />
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default SideBar
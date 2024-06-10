"use client";

import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AiFillHome, AiFillBell } from "react-icons/ai";
import { FaBell, FaHome, FaUser } from "react-icons/fa";
import { signOut, useSession } from "next-auth/react";
// import { VscFeedback } from "react-icons/vsc";
import { MdExplore, MdHome, MdLeaderboard } from "react-icons/md";
import { useEffect, useState } from "react";
// import { FaCirclePlus } from "react-icons/fa6";
import { Skeleton } from "@nextui-org/react";
import { BsThreeDots } from "react-icons/bs";
import { TbLogout } from "react-icons/tb";
import { FaBars } from "react-icons/fa";


interface SideBarProps {
    isSidebarExpanded: boolean;
    toggleSidebar: () => void;
  }
  
  const SideBar: React.FC<SideBarProps> = ({ isSidebarExpanded, toggleSidebar }) => {
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
            icon: <MdHome />
        },
        {
            route: "/leaderboard",
            label: "LeaderBoard",
            icon: <MdLeaderboard />
        }
    ];

    // const sidebarLinkstwo = [
    //     {
    //         route: "/profile/me",
    //         label: "Profile",
    //         icon: <FaUser />
    //     },
    //     {
    //         route: "/dashboard",
    //         label: "Home",
    //         icon: <AiFillHome />
    //     },
    // ];

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
                setImg(responseData?.user.image);
                setName(responseData?.user.userName);
                setUniversity(responseData?.user.university);
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

    return (
        <div className={`py-3 bg-[#31304D] text-white flex flex-col justify-between border-r border-y rounded-r-xl h-full w-full pr-3 transition-all duration-300`}>
            <div>
                <div className={`w-full flex ${!isSidebarExpanded ? " items-center justify-center " : " justify-start items-start "} `}>
                    <button onClick={toggleSidebar} className="p-4">
                        <FaBars size={20} />
                    </button>
                </div>

                <div>
                    {sidebarLinksone.map((link) => {
                        const isActive =
                            (pathname.includes(link.route) && link.route.length > 1) ||
                            pathname === link.route;
                        return (
                            <Link key={link.label} href={link.route}>
                                <div className={`px-3 py-5 mb-2 rounded-r-full text-center cursor-pointer duration-200 font-semibold ${isActive ? 'bg-[#161A30] text-white hover:bg-white hover:text-black' : 'hover:bg-[#B6BBC4] text-white'}`}>
                                    <div className="flex justify-center">
                                        <span className="text-2xl w-[30%] flex justify-end mr-2">{link.icon}</span>
                                        {isSidebarExpanded && <p className="max-lg:hidden flex tracking-wider w-[70%]">{link.label}</p>}
                                        {link.label === "Notifications" && unreadCount > 0 && (
                                            <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 ml-[6px]">{unreadCount}</span>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>

            <div className="flex relative w-full justify-center text-black items-center">
                {loading ? (
                    <div className="p-2 rounded-full flex items-center">
                        <Skeleton className="flex w-[35px] h-[35px] xl:w-[50px] xl:h-[50px] rounded-full" />
                        {isSidebarExpanded && (
                            <div className="w-[150px] xl:flex hidden ml-2 flex-col gap-2">
                                <Skeleton className="h-3 w-full rounded-lg" />
                                <Skeleton className="h-3 w-full rounded-lg" />
                            </div>
                        )}
                    </div>
                ) : (
                    <div className={`p-2 rounded-full border hover:shadow-sm duration-200 flex items-center ${isDrop ? 'xl:bg-[#F0ECE5] bg-white' : 'bg-[#F0ECE5]'}`}>
                        {img && (
                            <div onClick={handleDrop} className="cursor-pointer">
                                <Image className="rounded-full border border-[#31304D] w-[35px] h-[35px] xl:w-[50px] xl:h-[50px]" width={40} height={40} src={img} alt="profile pic" />
                            </div>
                        )}
                        {isSidebarExpanded && (
                            <div className="ml-2 px-4 xl:block hidden">
                                <p className="font-semibold">{name}</p>
                                <p className="xl:block opacity-75 hidden">{university}</p>
                            </div>
                        )}
                        {isSidebarExpanded && (
                            <div onClick={handleDrop} className={`xl:block cursor-pointer hover:bg-gray-200 duration-200 rounded-full hidden p-3 ml-2 ${isDrop ? 'bg-white' : 'bg-[#F0ECE5]'}`}>
                                <BsThreeDots />
                            </div>
                        )}
                    </div>
                )}

                {isDrop && (
                    <div className={` ${isSidebarExpanded ? ' right-0 ': ' -right-[calc(100%+100px)] '} absolute p-2 xl:-top-[calc(100%+3px)] top-[calc(100%+2px)]  flex justify-center shadow-sm items-center h-[80px] w-[250px] border border-[#31304D] rounded-xl bg-white`}>
                        <div onClick={handleLogout} className="ml-2 text-xl w-full hover:bg-red-800 hover:text-white duration-200 px-3 py-2 rounded-full border cursor-pointer justify-center flex items-center">
                            <TbLogout />
                            <span className="ml-2">Logout</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SideBar;

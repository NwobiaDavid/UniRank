"use client"

import "@/app/globals.css";
import { Inter } from "next/font/google";
import Provider from "@/components/Provider";
import SideBar from "@/components/ui/SideBar";
import ResSideBar from "@/components/ui/ResSideBar";
// import DashNavbar from "@/components/DashNavbar";
import { useState } from "react";
import DashNav from "@/components/ui/DashNav";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//     title: "UniRank",
//     description: "",
// };

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarExpanded(!isSidebarExpanded);
    };

    return (
        <section>
            <Provider>
                <section className="flex flex-col justify-between xl:h-full overflow-hidden w-screen bg-[#F0ECE5] h-screen">
                    <div className="h-full w-full flex-col xl:flex-row flex justify-between">
                        <section className=" lg:hidden z-30 w-full flex xl:hidden h-[10vh] fixed top-0" >
                            <DashNav />
                        </section>
                        <section className={`z-40 py-5 fixed left-0 h-full xl:flex hidden ${isSidebarExpanded ? 'w-[20%]' : 'w-[5%] '} transition-all duration-300`}>
                            <SideBar isSidebarExpanded={isSidebarExpanded} toggleSidebar={toggleSidebar} />
                        </section>
                        <section className={` p-2 xl:p-5  ${isSidebarExpanded ? 'xl:ml-[20%]' : 'xl:ml-[5%]'} xl:mb-0 mb-10  overflow-y-hidden h-[80vh] mt-[10vh] xl:mt-0 xl:h-screen ${isSidebarExpanded ? 'xl:w-[80%]' : 'xl:w-[95%]'} w-full transition-all duration-300`}>
                            <div className="md:border md:border-[#31304D] border-opacity-40 h-full rounded-xl">{children}</div>
                        </section>
                        <section className="border-t bg-[#31304D] z-30 w-full flex xl:hidden h-[10vh] fixed bottom-0">
                            <ResSideBar />
                        </section>
                    </div>
                </section>
            </Provider>
        </section>
    );
}

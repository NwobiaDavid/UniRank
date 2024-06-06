"use client"

import "@/app/globals.css";
import { Inter } from "next/font/google";
import Provider from "@/components/Provider";
import SideBar from "@/components/ui/SideBar";
import ResSideBar from "@/components/ui/ResSideBar";
// import DashNavbar from "@/components/DashNavbar";
import { useState } from "react";

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
                <section className="flex flex-col justify-between xl:h-full overflow-hidden w-screen h-screen">
                    <div className="h-full w-full flex-col xl:flex-row flex justify-between">
                        <section className={`z-40 py-5 fixed left-0 h-full xl:flex hidden ${isSidebarExpanded ? 'w-[20%]' : 'w-[5%] '} transition-all duration-300`}>
                            <SideBar isSidebarExpanded={isSidebarExpanded} toggleSidebar={toggleSidebar} />
                        </section>
                        <section className={`p-5  ${isSidebarExpanded ? 'xl:ml-[20%]' : 'xl:ml-[5%]'} xl:mb-0 mb-10  overflow-y-hidden h-screen ${isSidebarExpanded ? 'xl:w-[80%]' : 'xl:w-[95%]'} w-full transition-all duration-300`}>
                            <div className="border h-full rounded-xl">{children}</div>
                        </section>
                        <section className="border-t bg-white z-30 w-full flex xl:hidden h-[8%] fixed bottom-0">
                            <ResSideBar />
                        </section>
                    </div>
                </section>
            </Provider>
        </section>
    );
}

import "@/app/globals.css";

import { Inter } from "next/font/google";
import Provider from "@/components/Provider";
import SideBar from "@/components/ui/SideBar";
import ResSideBar from "@/components/ui/ResSideBar";
// import DashNavbar from "@/components/DashNavbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "UniRank",
    description: "",
};


export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section>
                <Provider>
                    <section className="flex flex-col justify-between xl:h-full h-screen " >
                        <div className=" h-full flex-col xl:flex-row flex  justify-between  " >
                            <section className="w-[20%] z-40 top-[5vh] fixed left-0 h-[90vh] xl:flex hidden " >
                                <SideBar />
                            </section>
                            <section className=" xl:ml-[20%] mb-10 w-full xl:h-full h-screen xl:w-[80%] " >
                                {children}
                            </section>
                            <section className=" border-t bg-white z-30 w-full flex xl:hidden h-[8%] fixed bottom-0 " >
                                <ResSideBar />
                            </section>

                        </div>
                    </section>
                </Provider>
        </section>
    );
}

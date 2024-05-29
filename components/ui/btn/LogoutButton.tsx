"use client";

import { signOut } from "next-auth/react";
import { redirect ,useRouter} from "next/navigation";
import type { ClientSafeProvider } from "next-auth/react";


export default function LogoutButton({ auth }: { auth?: ClientSafeProvider }) {

  const router = useRouter()


  const handleLogout = async () => {
    try {
      await signOut();
      // redirect("/");
    } catch (error) {
      console.error("Error during signout:", error);
    }
  };

  return (
    <button
      type="button"
      className=" text-sm w-full py-4 active:scale-95 duration-200 font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}

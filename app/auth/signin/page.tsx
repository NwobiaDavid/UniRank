// import Navbar from "@/components/Navbar";
import LoginButton from "@/components/ui/btn/LoginButton";
import { BuiltInProviderType } from "next-auth/providers";
import { ClientSafeProvider, LiteralUnion } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

async function getProviders() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/auth/providers`);

  if (!res.ok) {
    throw new Error("Failed to fetch providers");
  }

  return res.json();
}

export default async function SignIn() {
  const resp: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null = await getProviders();

  if (resp === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" h-screen">
      <div className="h-[7%] flex justify-center items-center ">
        <Link href={"/"} > UniRank </Link>
      </div>
      <div className="h-[93%] relative flex justify-center items-center " >
        {Object.values(resp).map((provider) => {
          return (
            <div key={provider.id} className="[&:not(:first-child)]:mt-4">
              <LoginButton auth={provider} />
            </div>
          );
        })}
        
      </div>
    </div>
  );
}

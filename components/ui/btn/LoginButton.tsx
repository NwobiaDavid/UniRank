"use client";

import { signIn } from "next-auth/react";

import type { ClientSafeProvider } from "next-auth/react";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";

const Icon = ({ provider }: { provider: string }) => {
  let imagePath = "";

  if (provider === "Google") {
    imagePath = "/images/icons/google.svg";
  } else {
    imagePath = "/images/icons/discord.svg";
  }

  return (
    <Image
      src={imagePath}
      width="25"
      height="25"
      alt="Google"
      className="mr-4"
    />
  );
};


export default function LoginButton({ auth }: { auth?: ClientSafeProvider }) {
  const router = useRouter()
  const handleSignIn = async () => {
    try {
      const result = await signIn(auth?.id || "");
      if (result?.error) {
        console.error("Sign-in error:", result.error);
      } else {
        router.push("/onboarding")
      }
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };
  return (
    <button
      type="button"
      className="border shadow-1 rounded-full hover:border-gray-500 duration-200 active:scale-95 py-3 px-6 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      onClick={() => signIn(auth?.id || "")}
    >
      {auth ? (
        <div className="flex items-center">
          <Icon provider={auth.name} />
          Sign In with {auth.name}
        </div>
      ) : (
        "Custom Login Page"
      )}
    </button>
  );
}

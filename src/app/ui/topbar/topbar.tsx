import Link from "next/link";
import React from "react";
import { getSessionInfo } from "@/app/lib/authentication/dal";
import LogoutForm from "../authenticate/logoutForm";
import ThemeToggleButton from "@/app/ui/topbar/themeToggleButton";
import { SessionInfo } from "@/app/lib/definitions";
export default async function Topbar() {
  const sessionInfo: SessionInfo = await getSessionInfo();

  return (
    <div className="relative flex items-center justify-center border-b-4 border-gray-300 p-2">
      <Link className="text-center text-3xl" href="/posts">
        {"Minhyeok's Diary"}
      </Link>

      <div className="absolute top-5 right-0 flex text-center">
        <ThemeToggleButton />
        <Link href="/search" className="pr-3">
          Search
        </Link>
        {sessionInfo.isAuth ? (
          <LogoutForm />
        ) : (
          <Link href="/authenticate/login">Login</Link>
        )}
      </div>
    </div>
  );
}

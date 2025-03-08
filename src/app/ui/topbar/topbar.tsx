import Link from "next/link";
import React from "react";
import { verifySession } from "@/app/lib/authentication/dal";
import LogoutForm from "../authenticate/logoutForm";
export default async function Topbar() {
  const session = await verifySession();

  return (
    <div className="relative items-center border-b-2 border-gray-300 p-2">
      <div className="w-full text-center text-3xl">{"Minhyeok's Diary"}</div>

      <div className="absolute top-5 right-0 text-center">
        {session.isAuth ? (
          <LogoutForm />
        ) : (
          <Link href="/authenticate/login">Login</Link>
        )}
      </div>
    </div>
  );
}

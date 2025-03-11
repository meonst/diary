import Link from "next/link";
import React from "react";
import { verifySession } from "@/app/lib/authentication/dal";
import LogoutForm from "../authenticate/logoutForm";
export default async function Topbar() {
  const session = await verifySession();

  return (
    <div className="relative flex items-center justify-center border-b-2 border-gray-300 p-2">
      <Link className="text-center text-3xl" href="/posts">
        {"Minhyeok's Diary"}
      </Link>
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

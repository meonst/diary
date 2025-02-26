import Link from "next/link";
import React from "react";
import { verifySession } from "@/app/lib/authentication/dal";
import LogoutForm from "../authenticate/logoutForm";
export default async function Topbar() {
  const session = await verifySession();

  return (
    <div>
      {"Minhyeok's Diary"}
      {session.isAuth ? (
        <LogoutForm />
      ) : (
        <Link href="/authenticate/login">Login</Link>
      )}
    </div>
  );
}

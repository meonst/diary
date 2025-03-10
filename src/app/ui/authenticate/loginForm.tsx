"use client";
import React from "react";
import handleLogin from "@/app/lib/authentication/login";
import { useActionState } from "react";
import Link from "next/link";

export default function LoginForm() {
  const [state, action, pending] = useActionState(handleLogin, undefined);
  return (
    <div className="flex h-screen w-full items-center justify-center" >
      <form action={action} className="h-fit w-fit rounded-md bg-white p-3 border-1">
        <div className="mb-1">
          <input type="email" name="email" placeholder="Email" required className="p-1" />
        </div>
        {state?.errors?.email && <p>{state.errors.email}</p>}

        <div className="mb-1">
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="p-1"
            required
          />
        </div>
        {state?.errors?.password && <p>{state.errors.password}</p>}
        <div className="p-1 pb-0 flex">
          <Link href="/authenticate/signUp">Sign Up</Link>
          <div className="flex-grow"></div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}
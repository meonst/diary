"use client";
import React from "react";
import handleSignUp from "@/app/lib/authentication/signUp";
import { useActionState } from "react";

export default function SignUpForm() {
  const [state, action, pending] = useActionState(handleSignUp, undefined);
  return (
    <div className="flex h-screen w-full items-center justify-center" >
      <form action={action} className="h-fit w-fit rounded-md bg-white p-3 border-1">
        <div className="mb-1">
          <input type="email" name="email" placeholder="Email" required className="p-1"/>
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

        <div className="mb-1">
          <input
            type="password"
            name="repeatPassword"
            placeholder="Repeat Password"
            className="p-1"
            required
          />
        </div>
        {state?.errors?.repeatPassword && <p>{state.errors.repeatPassword}</p>}
        <div className="p-1 pb-0 flex">
          <div className="flex-grow"></div>
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  );
}
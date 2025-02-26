"use client";
import React from "react";
import handleSignUp from "@/app/lib/authentication/signUp";
import { useActionState } from "react";

export default function SignUpForm() {
  const [state, action, pending] = useActionState(handleSignUp, undefined);
  return (
    <form action={action}>
      <div>
        <input type="email" name="email" placeholder="Email" required />
      </div>
      {state?.errors?.email && <p>{state.errors.email}</p>}

      <div>
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
      </div>
      {state?.errors?.password && <p>{state.errors.password}</p>}

      <div>
        <input
          type="password"
          name="repeatPassword"
          placeholder="Repeat Password"
          required
        />
      </div>
      {state?.errors?.repeatPassword && <p>{state.errors.repeatPassword}</p>}

      <button type="submit">Sign Up</button>
    </form>
  );
}

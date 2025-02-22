'use client'
import React from "react";
import handleLogin from "@/app/lib/authentication/login";
import { useActionState } from "react";
import Link from "next/link";

export default function LoginForm() {
    const [state, action, pending] = useActionState(handleLogin, undefined);
    return (
        <div>
        <form action={action}>
            <div>
                <input type="email" name="email" placeholder="Email" required />
            </div>
            {state?.errors?.email && <p>{state.errors.email}</p>}

            <div>
                <input type="password" name="password" placeholder="Password" required />
            </div>
            {state?.errors?.password && <p>{state.errors.password}</p>}

            <button type="submit">Login</button>
        </form>
        <Link href='/authenticate/signUp'>Sign Up</Link>
        </div>
    )
}




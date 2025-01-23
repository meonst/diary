'use client'
import { redirect } from "next/navigation";
import React from "react";

export default function Topbar() {
    const a = "Minhyeok's Diary";
    return (
        <div>
            {a}
            <button>Login</button>
        </div>
    )
}
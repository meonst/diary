'use client'
import { redirect } from "next/navigation";
import React from "react";

export default function Topbar() {
    return (
        <div>
            Minhyeok's Diary
            <button onClick={() => {redirect("/login")}}>Login</button>
        </div>
    )
}
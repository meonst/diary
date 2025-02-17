'use client'
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export default function Topbar() {
    return (
        <div>
            Minhyeok's Diary
            <Link href='/login'>Login</Link>
        </div>
    )
}
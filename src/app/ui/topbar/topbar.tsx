
import Link from "next/link";
import React from "react";

export default function Topbar() {
    return (
        <div>
            {"Minhyeok's Diary"}
            <Link href='/authenticate/login'>Login</Link>
        </div>
    )
}
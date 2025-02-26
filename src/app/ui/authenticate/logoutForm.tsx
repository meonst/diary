"use client";
import React from "react";
import handleLogout from "@/app/lib/authentication/logout";

export default function LogoutForm() {
  return (
    <form action={handleLogout}>
      <button type="submit">Logout</button>
    </form>
  );
}

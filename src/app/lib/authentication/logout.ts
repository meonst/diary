"use server";
import { redirect } from "next/navigation";
import { deleteSession } from "@/app/lib/authentication/session";

export default async function handleLogout(formData: FormData) {
  await deleteSession();
  redirect("/posts");
}

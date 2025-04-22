import "server-only";
import { cookies } from "next/headers";
import { decrypt } from "@/app/lib/authentication/session";
import { cache } from "react";
// data access layer
export const verifySession = cache(async () => {
  const session = await getSession();
  if (!session?.userId) {
    return { isAuth: false, userId: "", userRole: "" };
  }
  return {
    isAuth: true,
    userId: session.userId,
    userRole: session.userRole,
    userEmail: session.userEmail,
  };
});

export async function verifyAdmin(): Promise<boolean> {
  const session = await verifySession();
  const isAdmin: boolean = session.isAuth && session.userRole == "admin";
  return isAdmin;
}

async function getSession() {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);
  return session;
}

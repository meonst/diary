import "server-only";
import { cookies } from "next/headers";
import { decrypt } from "@/app/lib/authentication/session";
import { cache } from "react";
import { JWTPayload } from "jose";
import { SessionInfo } from "@/app/lib/definitions";

export const getSessionInfo = cache(async () => {
  const session = await getSession();
  const emptySessionInfo: SessionInfo = {
    isAuth: false,
    isAdmin: false,
    userId: "",
    userRole: "",
    userEmail: "",
  };
  if (!session) {
    return emptySessionInfo;
  } else {
    return {
      isAuth: true,
      isAdmin: "admin" == session.userId,
      userId: session.userId,
      userRole: session.userRole,
      userEmail: session.userEmail,
    };
  }
});

async function getSession() {
  const cookie = (await cookies()).get("session")?.value;
  const session: JWTPayload | null = await decrypt(cookie);
  return session;
}

import React from "react";
import MakePostForm from "@/app/ui/posts/makePostForm";
import { getSessionInfo } from "@/app/lib/authentication/dal";
import PostLoader from "@/app/ui/posts/postLoader";
import { SessionInfo } from "@/app/lib/definitions";
export default async function Page() {
  const session: SessionInfo = await getSessionInfo();
  const isAdmin: boolean = session.userRole == "admin";
  return (
    <div className="flex flex-col items-center">
      <div className="xs:w-xl max-w-xl">
        {isAdmin && <MakePostForm />}
        <PostLoader isAdmin={isAdmin}></PostLoader>
      </div>
    </div>
  );
}

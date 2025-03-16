import React from "react";
import MakePostForm from "@/app/ui/posts/makePostForm";
import { verifySession } from "@/app/lib/authentication/dal";
import PostLoader from "@/app/ui/posts/postLoader";
export default async function Page() {
  const session = await verifySession();
  const isAdmin = session.isAuth && session.userRole == "admin";
  return (
    <div className="flex columns-3 flex-col items-center">
      <div className="xs:w-xl max-w-xl">
        {isAdmin && <MakePostForm />}
        <PostLoader isAdmin={isAdmin}></PostLoader>
      </div>
    </div>
  );
}

import React from "react";
import MakePostForm from "@/app/ui/posts/makePostForm";
import { verifyAdmin } from "@/app/lib/authentication/dal";
import PostLoader from "@/app/ui/posts/postLoader";
export default async function Page() {
  const isAdmin = await verifyAdmin();
  return (
    <div className="flex flex-col items-center">
      <div className="xs:w-xl max-w-xl">
        {isAdmin && <MakePostForm />}
        <PostLoader isAdmin={isAdmin}></PostLoader>
      </div>
    </div>
  );
}

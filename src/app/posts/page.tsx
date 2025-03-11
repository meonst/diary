import React from "react";
import MakePostForm from "@/app/ui/posts/makePostForm";
import { PostData } from "@/app/lib/definitions";
import { getPostData } from "@/app/lib/dbAction/getPosts";
import PostSimple from "@/app/ui/posts/postSimple";
import { verifySession } from "../lib/authentication/dal";
import LoadMore from "@/app/ui/loadMore";
export default async function Page() {
  // const postDataArray: PostData[] = await getPostData();
  const session = await verifySession();
  const isAdmin = session.isAuth && session.userRole == "admin";
  return (
    <div className="flex columns-3 flex-col items-center">
      <div className="xs:w-xl max-w-xl">
        {isAdmin && <MakePostForm />}
        <LoadMore isAdmin={isAdmin}></LoadMore>
      </div>
    </div>
  );
}

import React from "react";
import MakePostForm from "@/app/ui/posts/makePostForm";
import { PostData } from "@/app/lib/definitions";
import { getPostData } from "@/app/lib/dbAction/getPosts";
import PostSimple from "@/app/ui/posts/postSimple";
import { verifySession } from "../lib/authentication/dal";
export default async function Page() {
  const postDataArray: PostData[] = await getPostData();
  const session = await verifySession();
  const isAdmin = session.isAuth && session.userRole == "admin";
  return (
    <div>
      {isAdmin && <MakePostForm />}
      {postDataArray.map((postData: PostData) => {
        return <PostSimple postData={postData} key={postData["id"]} />;
      })}
    </div>
  );
}

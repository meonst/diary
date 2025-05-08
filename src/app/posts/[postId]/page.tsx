import React from "react";
import { getPostDataWithId } from "@/app/lib/dbAction/getPosts";
import { PostData } from "@/app/lib/definitions";
import { getSessionInfo } from "@/app/lib/authentication/dal";
import { SessionInfo } from "@/app/lib/definitions";
import PostDetail from "@/app/ui/posts/postDetail";

export default async function Page({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const sessionInfo: SessionInfo = await getSessionInfo();
  const { postId } = await params;
  const postDataArray: PostData[] = await getPostDataWithId(postId);

  if (postDataArray.length == 1) {
    return (
      <PostDetail
        session={sessionInfo}
        postData={postDataArray[0]}
      ></PostDetail>
    );
  } else {
    return <div>No post with matching Id</div>;
  }
}

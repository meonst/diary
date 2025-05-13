import React from "react";
import { CommentData } from "@/app/lib/definitions";
import Comment from "@/app/ui/posts/comments/comment";
export function CommentContainer({ comments }: { comments: CommentData[] }) {
  return (
    <div className="ml-0.5 mr-0.5">
      {comments.map((commentData: CommentData, index: number) => {
        return (
          <Comment key={index} commentData={commentData}></Comment>
        );
      })}
    </div>
  );
}

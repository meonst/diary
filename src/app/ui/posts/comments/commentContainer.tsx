import React from "react";
import { CommentData } from "@/app/lib/definitions";
import MakeCommentForm from "@/app/ui/posts/comments/makeCommentForm";
import Comment from "@/app/ui/posts/comments/comment";
export function CommentContainer({ comments }: { comments: CommentData[] }) {
  return (
    <div className="m-0.5">
      {comments.map((commentData: CommentData, index: number) => {
        return (
          <div key={index} className="">
            <Comment commentData={commentData}></Comment>
          </div>
        );
      })}
    </div>
  );
}

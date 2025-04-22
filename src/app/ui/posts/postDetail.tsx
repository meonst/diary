import React from "react";
import { CommentData, FileEssential, PostData } from "@/app/lib/definitions";
import DeleteButton from "@/app/ui/posts/delete/deletePostButton";
import { FileContainer } from "@/app/ui/posts/file/fileContainer";
import { monthDayString } from "@/app/lib/misc/time";
import MakeCommentForm from "@/app/ui/posts/comments/makeCommentForm";
import { CommentContainer } from "@/app/ui/posts/comments/commentContainer";
import { getComments } from "@/app/lib/dbAction/getComments";
export default async function PostDetail({
  postData,
  isAdmin,
}: {
  postData: PostData;
  isAdmin: boolean;
}) {
  const time = postData.time;
  const content = postData.content;
  const id = postData.id;

  const fileOne: FileEssential = postData.fileOne;
  const fileTwo: FileEssential = postData.fileTwo;
  const fileThree: FileEssential = postData.fileThree;
  const fileFour: FileEssential = postData.fileFour;

  const files: FileEssential[] = [];
  const commentData: CommentData[] = await getComments(id);
  if (fileOne.name != "") files.push(fileOne);
  if (fileTwo.name != "") files.push(fileTwo);
  if (fileThree.name != "") files.push(fileThree);
  if (fileFour.name != "") files.push(fileFour);
  return (
    <div className="flex flex-col items-center">
      <div id={id} className="flex max-w-8/12">
        <div className="grid-cols-1 border-2">
          {content != "" && (
            <p className="overflow-hidden p-2 break-words whitespace-pre-line">
              {content}
            </p>
          )}
          <FileContainer files={files}></FileContainer>

          <div className="flex">
            <div className="p-2">{monthDayString(time)}</div>
            <div className="flex-grow"></div>
            <div className="p-2">{isAdmin && <DeleteButton postId={id} />}</div>
          </div>
        </div>
        <div className="grid-cols-2 border-2">
          <MakeCommentForm postId={id}></MakeCommentForm>
          <CommentContainer comments={commentData}></CommentContainer>
        </div>
      </div>
    </div>
  );
}

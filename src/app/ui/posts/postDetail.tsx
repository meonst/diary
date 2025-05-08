import React from "react";
import {
  CommentData,
  FileEssential,
  PostData,
  SessionInfo,
} from "@/app/lib/definitions";
import DeleteButton from "@/app/ui/posts/delete/deletePostButton";
import { FileContainer } from "@/app/ui/posts/file/fileContainer";
import { monthDayString } from "@/app/lib/misc/time";
import CommentCluster from "@/app/ui/posts/comments/commentCluster";
import { getComments } from "@/app/lib/dbAction/getComments";
export default async function PostDetail({
  postData,
  session,
}: {
  postData: PostData;
  session: SessionInfo;
}) {
  const time: Date = postData.time;
  const content: string = postData.content;
  const id: string = postData.id;

  const fileOne: FileEssential = postData.fileOne;
  const fileTwo: FileEssential = postData.fileTwo;
  const fileThree: FileEssential = postData.fileThree;
  const fileFour: FileEssential = postData.fileFour;

  const files: FileEssential[] = [];
  const commentData: CommentData[] = await getComments(id);
  const isAdmin: boolean = session.userRole == "admin";

  if (fileOne.name != "") files.push(fileOne);
  if (fileTwo.name != "") files.push(fileTwo);
  if (fileThree.name != "") files.push(fileThree);
  if (fileFour.name != "") files.push(fileFour);
  return (
    <div className="flex flex-col items-center">
      <div className="w-xl border-r-2 border-l-2 border-gray-300">
        <div id={id}>
          <div className="">
            {content != "" && (
              <p className="overflow-hidden p-2 break-words whitespace-pre-line">
                {content}
              </p>
            )}
            <FileContainer files={files}></FileContainer>
            <div className="flex">
              <div className="p-2">{monthDayString(time)}</div>
              <div className="flex-grow"></div>
              <div className="p-2">
                {isAdmin && <DeleteButton postId={id} />}
              </div>
            </div>
          </div>
          <CommentCluster id={id} commentData={commentData}></CommentCluster>
        </div>
      </div>
    </div>
  );
}

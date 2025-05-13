import React from "react";
import { PostData } from "@/app/lib/definitions";
import { monthDayString } from "@/app/lib/misc/time";
import { FileContainer } from "@/app/ui/posts/file/fileContainer";
import DeletePostButton from "./delete/deletePostButton";
import { FileEssential } from "@/app/lib/definitions";
import Link from "next/link";
export default function PostSimple({
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
  if (fileOne.name != "") files.push(fileOne);
  if (fileTwo.name != "") files.push(fileTwo);
  if (fileThree.name != "") files.push(fileThree);
  if (fileFour.name != "") files.push(fileFour);

  return (
    <div id={id} className="first:border-t-0 border-t-2 border-b-2 border-gray-300 hover:bg-gray-50">
      <Link href={`/posts/${id}`}>
        {content != "" && (
          <p className="overflow-hidden p-2 break-words whitespace-pre-line">
            {content}
          </p>
        )}
        <FileContainer files={files}></FileContainer>
        <div className="flex">
          <label className="p-2">{monthDayString(time)}</label>
          <div className="flex-grow"></div>
          <div className="p-2">
            {isAdmin && <DeletePostButton postId={id} />}
          </div>
        </div>
      </Link>
    </div>
  );
}

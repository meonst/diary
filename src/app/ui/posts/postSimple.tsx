import React from "react";
import { PostData } from "@/app/lib/definitions";
import { monthDayString } from "@/app/lib/misc/time";
import { FileContainer } from "@/app/ui/posts/file/fileContainer";
import DeleteButton from "./delete/deleteButton";
import { FileEssential } from "@/app/lib/definitions";
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
    <div id={id} className="border-2 border-t-0 border-gray-300">
      <p className="overflow-hidden p-2 break-words whitespace-pre-line">
        {content}
      </p>
      {FileContainer(files)}
      <div className="flex">
        <div className="p-2">{monthDayString(time)}</div>
        <div className="flex-grow"></div>
        <div className="p-2">{isAdmin && <DeleteButton postId={id} />}</div>
      </div>
    </div>
  );
}

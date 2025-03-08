import React from "react";
import { PostData } from "@/app/lib/definitions";
import { monthDayString } from "@/app/lib/misc/time";
import { FileContainerWithNames } from "@/app/ui/posts/file/fileContainer";
import DeleteButton from "./delete/deleteButton";
import { verifySession } from "@/app/lib/authentication/dal";

export default async function PostSimple({ postData }: { postData: PostData }) {
  const session = await verifySession();
  const isAdmin = session.isAuth && session.userRole == "admin";
  const time = postData.time;
  const content = postData.content;
  const id = postData.id;

  const fileNameOne = postData.fileNameOne;
  const fileNameTwo = postData.fileNameTwo;
  const fileNameThree = postData.fileNameThree;
  const fileNameFour = postData.fileNameFour;

  const files: string[] = [];
  if (fileNameOne != "") files.push(fileNameOne);
  if (fileNameTwo != "") files.push(fileNameTwo);
  if (fileNameThree != "") files.push(fileNameThree);
  if (fileNameFour != "") files.push(fileNameFour);

  return (
    <div id={id} className="border-2 border-t-0 border-gray-300">
      <div className="p-0.5">{content}</div>
      {FileContainerWithNames(files)}
      <div className="flex">
        <div className="p-0.5">{monthDayString(time)}</div>
        <div className="flex-grow"></div>
        <div className="p-0.5">{isAdmin && <DeleteButton postId={id} />}</div>
      </div>
    </div>
  );
}

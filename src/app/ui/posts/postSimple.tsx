import { PostData } from "@/app/lib/definitions";
import React from "react";
import { FileWithName } from "@/app/ui/posts/file/file";
import { dateString } from "@/app/lib/misc/time";
import DeleteButton from "@/app/ui/posts/delete/deleteButton";
import {
  fileContainerClassNames,
  fileClassNames,
} from "@/app/ui/posts/file/fileClusterClassNames";
export default function PostSimple({ postData }: { postData: PostData }) {
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
    <div id={id} className="border-2 border-green-500">
      <div className="">{content}</div>
      <div className={`${fileContainerClassNames[files.length - 1]}`}>
        {files.map((fileName: string, index: number) => {
          return (
            <div key={index} className={`${fileClassNames[index]}`}>
              <FileWithName fileName={fileName} />
            </div>
          );
        })}
      </div>
      <div>{dateString(time)}</div>
      <DeleteButton postId={id} />
    </div>
  );
}

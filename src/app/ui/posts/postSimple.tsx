import { PostData } from "@/app/lib/definitions";
import React from "react";
import { FileWithName } from "@/app/ui/posts/file/file";
import { dateString } from "@/app/lib/misc/time";
import DeleteButton from "@/app/ui/posts/delete/deleteButton";
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

  const fileContainerClassNames = [
    "text-center items-center min-h-72 w-full grid grid-cols-1 grid-rows-1",
    "text-center items-center min-h-72 w-full grid grid-cols-2 grid-rows-1",
    "text-center items-center min-h-72 w-full grid grid-cols-2 grid-rows-2",
    "text-center items-center min-h-72 w-full grid grid-cols-2 grid-rows-2",
  ];
  const fileClassNames = [
    [
      "flex border-1 relative m-0.5 p-0 w-full h-full min-h-36 overflow-hidden aspect-16/9 justify-center items-center bg-black"
    ],
    [
      "flex border-1 relative m-0.5 p-0 w-full h-full min-h-36 overflow-hidden aspect-16/9 justify-center items-center bg-black",
      "flex border-1 relative m-0.5 p-0 w-full h-full min-h-36 overflow-hidden aspect-16/9 justify-center items-center bg-black",
    ],
    [
      "flex border-1 relative m-0.5 p-0 w-full h-full min-h-36 overflow-hidden row-span-2 aspect-16/9 justify-center items-center bg-black",
      "flex border-1 relative m-0.5 p-0 w-full h-full min-h-36 overflow-hidden row-span-1 aspect-16/9 justify-center items-center bg-black",
      "flex border-1 relative m-0.5 p-0 w-full h-full min-h-36 overflow-hidden row-span-1 aspect-16/9 justify-center items-center bg-black",
    ],
    [
      "flex border-1 relative m-0.5 p-0 w-full h-full min-h-36 overflow-hidden aspect-16/9 justify-center items-center bg-black",
      "flex border-1 relative m-0.5 p-0 w-full h-full min-h-36 overflow-hidden aspect-16/9 justify-center items-center bg-black",
      "flex border-1 relative m-0.5 p-0 w-full h-full min-h-36 overflow-hidden aspect-16/9 justify-center items-center bg-black",
      "flex border-1 relative m-0.5 p-0 w-full h-full min-h-36 overflow-hidden aspect-16/9 justify-center items-center bg-black",
    ],
  ];

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

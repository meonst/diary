"use client";
import React, { ChangeEvent } from "react";
import insertPost from "@/app/lib/dbAction/insertPost";
import checkLog from "@/app/lib/debug/checkLog";
import { DragEvent } from "react";
import { useState } from "react";
import { FileWithFile } from "@/app/ui/posts/file/file";

export default function MakePostForm() {
  const [files, setFiles] = useState<File[]>([]);
  const [content, setContent] = useState<string>("");
  function handleDragOver(event: DragEvent) {
    event.stopPropagation();
    event.preventDefault();
    if (event.dataTransfer == null) return;
  }

  function handleDrop(event: DragEvent) {
    event.stopPropagation();
    event.preventDefault();

    const droppedFiles = event.dataTransfer.files;
    if (files.length + droppedFiles.length > 4) {
      checkLog("you can only upload four files per post"); // going to add message
      return;
    }
    if (droppedFiles.length == 0) return;
    const newFiles = [...files];
    for (let i = 0; i < droppedFiles.length; i++) {
      newFiles.push(droppedFiles[i]);
    }
    setFiles(newFiles);
  }

  function reset() {
    setContent("");
    setFiles([]);
  }
  function insertPostWithData(formData: FormData) {
    if (files.length == 0 && content == "") return;
    insertPost(formData, files, content);
    reset();
  }

  function addFilesWithButton(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files == null) return;
    const addedFiles: FileList = event.target.files;

    if (files.length + addedFiles.length > 4) {
      event.target.value = "";
      return;
    }

    const newFiles = [...files];
    for (let i = 0; i < addedFiles.length; i++) {
      newFiles.push(addedFiles[i]);
    }
    event.target.value = "";
    setFiles(newFiles);
  }

  const fileContainerClassNames = [
    "text-center items-center h-72 grid grid-cols-1 grid-rows-1",
    "text-center items-center h-72 grid grid-cols-2 grid-rows-1",
    "text-center items-center h-72 grid grid-cols-2 grid-rows-2",
    "text-center items-center h-72 grid grid-cols-2 grid-rows-2",
  ];
  const fileClassNames = [
    ["border-1 relative m-0.5 p-0 max-w-full max-h-full overflow-hidden"],
    [
      "border-1 relative m-0.5 p-0 max-w-full max-h-full overflow-hidden",
      "border-1 relative m-0.5 p-0 max-w-full max-h-full overflow-hidden",
    ],
    [
      "row-span-2 aspect-auto border-1 relative m-0.5 p-0 max-w-full max-h-full overflow-hidden",
      "row-span-1 aspect-auto border-1 relative m-0.5 p-0 max-w-full max-h-full overflow-hidden",
      "row-span-1 aspect-auto border-1 relative m-0.5 p-0 max-w-full max-h-full overflow-hidden",
    ],
    [
      "aspect-auto border-1 relative m-0.5 p-0 max-w-full max-h-full overflow-hidden",
      "aspect-auto border-1 relative m-0.5 p-0 max-w-full max-h-full overflow-hidden",
      "aspect-auto border-1 relative m-0.5 p-0 max-w-full max-h-full overflow-hidden",
      "aspect-auto border-1 relative m-0.5 p-0 max-w-full max-h-full overflow-hidden",
    ],
  ];

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="h-fit min-h-32 w-full border-4 border-solid border-amber-500"
    >
      <div className="">
        <form action={insertPostWithData}>
          <div>
            <textarea
              value={content}
              onChange={(event) => {
                setContent(event.target.value);
                event.target.style.height = "auto";
                event.target.style.height = `${event.target.scrollHeight}px`;
              }}
              placeholder="What do you want to say?"
              className="min-h-22 w-full resize-none overflow-hidden p-2"
            ></textarea>

            <div className={fileContainerClassNames[files.length - 1]}>
              {/* <div className=""> */}
              {files.map((file: File, index: number) => {
                return (
                  <div
                    key={index}
                    className={fileClassNames[files.length - 1][index]}
                  >
                    <div className="">{FileWithFile(file)}</div>
                    <button
                      type="button"
                      className="absolute top-0 right-0"
                      onClick={() => {
                        const newFiles: File[] = [];
                        for (let i = 0; i < files.length; i++) {
                          if (i != index) newFiles.push(files[i]);
                        }
                        setFiles(newFiles);
                      }}
                    >
                      {"❌" /* delete file */}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex w-full items-center">
            <input
              id="file-upload"
              type="file"
              onChange={addFilesWithButton}
              hidden
              multiple
            ></input>
            <label htmlFor="file-upload" className="pl-1">
              🗂️
            </label>
            <div className="flex-grow"></div>
            <button className="pr-1 text-right" type="submit">
              ✍️
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

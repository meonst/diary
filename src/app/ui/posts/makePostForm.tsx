"use client";
import React, { ChangeEvent } from "react";
import insertPost from "@/app/lib/dbAction/insertPost";
import checkLog from "@/app/lib/debug/checkLog";
import { DragEvent } from "react";
import { useState } from "react";
import { FileWithFile } from "@/app/ui/posts/file/file";

export default function MakePostForm() {
  const [files, setFiles] = useState<File[]>([]);

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
      checkLog("you can only upload four files per post");
      return;
    }
    if (droppedFiles.length == 0) return;
    const newFiles = [...files];
    checkLog(newFiles, "1");
    for (let i = 0; i < droppedFiles.length; i++) {
      checkLog("file added");
      newFiles.push(droppedFiles[i]);
    }
    setFiles(newFiles);
  }

  function insertPostWithFiles(formData: FormData) {
    insertPost(formData, files);
    const newFiles: File[] = [];
    setFiles(newFiles);
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

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="h-96 w-96 border-2 border-solid border-red-400"
    >
      <div className="border-4 border-black">
        <form action={insertPostWithFiles}>
          <input
            type="text"
            name="content"
            placeholder="content"
            className="border-2"
          />
          <input
            type="file"
            name="file"
            onChange={addFilesWithButton}
            multiple
          ></input>
          <button type="submit">post</button>
        </form>
      </div>
      <div>
        {files.map((file: File, index: number) => {
          return (
            <div key={index}>
              {FileWithFile(file)}
              <button
                onClick={() => {
                  const newFiles: File[] = [];
                  for (let i = 0; i < files.length; i++) {
                    if (i != index) newFiles.push(files[i]);
                  }
                  setFiles(newFiles);
                }}
              >
                remove this file
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

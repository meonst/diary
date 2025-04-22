"use client";
import React from "react";
import insertPost from "@/app/lib/dbAction/insertPost";
import checkLog from "@/app/lib/debug/checkLog";
import { DragEvent } from "react";
import { useState } from "react";
import { FileContainerWithDelete } from "@/app/ui/posts/file/fileContainer";
import { FileEssential } from "@/app/lib/definitions";
import getFileTypeFromFileName from "@/app/lib/misc/fileType";
import Loading from "@/app/ui/loading";
let content: string = "";
export default function MakePostForm() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);

  function handleDragOver(event: DragEvent) {
    event.stopPropagation();
    event.preventDefault();
    if (event.dataTransfer == null) return;
  }

  function handleDrop(event: DragEvent) {
    event.stopPropagation();
    event.preventDefault();

    const addedFiles: FileList = event.dataTransfer.files;
    addFiles(addedFiles);
  }

  function addFilesWithButton(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files == null) return;
    const addedFiles: FileList = event.target.files;
    addFiles(addedFiles);
    event.target.value = "";
  }

  function addFiles(addedFiles: FileList) {
    if (files.length + addedFiles.length > 4) {
      checkLog("you can only upload four files per post"); // going to add message
      return;
    }
    if (addedFiles.length == 0) return;
    const newFiles = [...files];

    for (let i = 0; i < addedFiles.length; i++) {
      newFiles.push(addedFiles[i]);
    }
    setFiles(newFiles);
  }

  function reset() {
    setFiles([]);
  }

  function insertPostWithData() {
    if (files.length == 0 && content == "") {
      setUploading(false);
      return;
    }
    insertPost(files, content);
    reset();
    setUploading(false);
  }

  function removeFile(index: number) {
    const newFiles: File[] = [];
    for (let i = 0; i < files.length; i++) {
      if (i != index) newFiles.push(files[i]);
    }
    setFiles(newFiles);
  }

  function FileContainer(files: File[]) {
    const fileEssentials: FileEssential[] = [];
    files.forEach((file: File) => {
      const fileEssential: FileEssential = {
        name: file.name,
        url: URL.createObjectURL(file),
        type: getFileTypeFromFileName(file.name),
      };
      fileEssentials.push(fileEssential);
    });
    return (
      <FileContainerWithDelete
        files={fileEssentials}
        removeFile={removeFile}
      ></FileContainerWithDelete>
    );
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="relative h-fit min-h-32 w-full max-w-xl border-2 border-t-0 border-gray-300 sm:w-xl"
    >
      {uploading && (
        <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center bg-gray-800/20">
          <Loading></Loading>
        </div>
      )}
      <form
        action={insertPostWithData}
        onSubmit={() => {
          setUploading(true);
        }}
        className=""
      >
        <div className="w-full">
          <textarea
            onChange={(event) => {
              content = event.target.value;
              event.target.style.height = "auto";
              event.target.style.height = `${event.target.scrollHeight}px`;
            }}
            placeholder="What do you want to say?"
            className="max-h-66 min-h-22 w-full resize-none p-2"
          ></textarea>
          {FileContainer(files)}
        </div>
        <div className="flex w-full items-center">
          <input
            id="file-upload"
            type="file"
            onChange={addFilesWithButton}
            disabled={uploading}
            hidden
            multiple
          ></input>
          <label htmlFor="file-upload" className="pl-2 text-xl">
            🗂️
          </label>
          <div className="flex-grow"></div>

          <button
            className="pr-2 text-right text-xl"
            type="submit"
            disabled={uploading}
          >
            ✍️
          </button>
        </div>
      </form>
    </div>
  );
}

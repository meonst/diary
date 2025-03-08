import React from "react";
import { fileContainerClassNames, fileClassNames } from "@/app/lib/classNames";
import { FileWithName, FileWithFile } from "@/app/ui/posts/file/file";

export function FileContainerWithNames(files: string[]) {
  return (
    <div className={fileContainerClassNames[files.length - 1]}>
      {files.map((fileName: string, index: number) => {
        return (
          <div
            key={index}
            className={`${fileClassNames[files.length - 1][index]}`}
          >
            <FileWithName fileName={fileName} />
          </div>
        );
      })}
    </div>
  );
}
export function FileContainerWithFiles(
  files: File[],
  removeFile: (index: number) => void,
) {
  return (
    <div className={fileContainerClassNames[files.length - 1]}>
      {files.map((file: File, index: number) => {
        return (
          <div
            key={index}
            className={`${fileClassNames[files.length - 1][index]}`}
          >
            <FileWithFile file={file} />
            <button
              type="button"
              className="absolute top-1 right-1"
              onClick={() => {
                removeFile(index);
              }}
            >
              {"❌"}
            </button>
          </div>
        );
      })}
    </div>
  );
}

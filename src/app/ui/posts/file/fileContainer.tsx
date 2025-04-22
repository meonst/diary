import React from "react";
import { fileContainerClassNames, fileClassNames } from "@/app/lib/classNames";
import { FileEssential } from "@/app/lib/definitions";
import { File } from "@/app/ui/posts/file/file";

export function FileContainer({ files }: { files: FileEssential[] }) {
  return (
    <div className={fileContainerClassNames[files.length - 1]}>
      {files.map((file: FileEssential, index: number) => {
        return (
          <div
            key={index}
            className={`${fileClassNames[files.length - 1][index]}`}
          >
            <File file={file} />
          </div>
        );
      })}
    </div>
  );
}
export function FileContainerWithDelete({
  files,
  removeFile,
}: {
  files: FileEssential[];
  removeFile: (index: number) => void;
}) {
  return (
    <div className={fileContainerClassNames[files.length - 1]}>
      {files.map((file: FileEssential, index: number) => {
        return (
          <div
            key={index}
            className={`${fileClassNames[files.length - 1][index]}`}
          >
            <File file={file} />
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

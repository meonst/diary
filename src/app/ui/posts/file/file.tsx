import React from "react";
import ImageFile from "@/app/ui/posts/file/imageFile";
import VideoFile from "@/app/ui/posts/file/videoFile";
import Link from "next/link";
import { FileTypes } from "@/app/lib/definitions";
import { FileEssential } from "@/app/lib/definitions";

export function File({ file }: { file: FileEssential }) {
  const fileType: number = file.type;
  const isImage: boolean = fileType == FileTypes.Image;
  const isVideo: boolean = fileType == FileTypes.Video;
  const isFile: boolean = !isImage && !isVideo;
  return (
    <div className="border-1 border-gray-300 hover:border-gray-500">
      {isFile && <DefaultFile file={file} />}
      {isImage && <ImageFile file={file} />}
      {isVideo && <VideoFile file={file} />}
    </div>
  );
}

function DefaultFile({ file }: { file: FileEssential }) {
  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden">
      <Link href={file.url}>{file.name}</Link>
    </div>
  );
}

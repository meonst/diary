import React from "react";
import { getHead, getSignedFileUrl } from "@/app/lib/bucketAction/getFile";
// import TextFile from "@/app/ui/posts/file/textFile";
import ImageFile from "@/app/ui/posts/file/imageFile";
import VideoFile from "@/app/ui/posts/file/videoFile";
import Link from "next/link";

const image: string = "image";
const video: string = "video";

export async function FileWithName({ fileName }: { fileName: string }) {
  const header = await getHead(fileName);
  const fileType = header?.ContentType?.split("/")[0]
    ? header?.ContentType?.split("/")[0]
    : "etc";
  const fileUrl: string = await getSignedFileUrl(fileName);

  return FileByType(fileName, fileUrl, fileType);
}

export function FileWithFile(file: File) {
  const fileType = file.type.split("/")[0];
  const fileUrl: string = URL.createObjectURL(file);
  return FileByType(file.name, fileUrl, fileType);
}

function FileByType(fileName: string, fileUrl: string, fileType: string) {
  const isImage: boolean = fileType == image;
  const isVideo: boolean = fileType == video;
  const isFile: boolean = !isImage && !isVideo;
  return (
    <div className="">
      {isFile && <DefaultFile fileUrl={fileUrl} fileName={fileName} />}
      {isImage && <ImageFile fileUrl={fileUrl} fileName={fileName} />}
      {isVideo && <VideoFile fileUrl={fileUrl} fileName={fileName} />}
    </div>
  );
}

function DefaultFile({
  fileUrl,
  fileName,
}: {
  fileUrl: string;
  fileName: string;
}) {
  return (
    <div className="row-span-2 flex h-full w-full items-center justify-center overflow-hidden">
      <Link href={fileUrl}>{fileName}</Link>
    </div>
  );
}

import React from "react";
import { getHead, getSignedFileUrl } from "@/app/lib/bucketAction/getFile";
import TextFile from "@/app/ui/posts/file/textFile";
import ImageFile from "@/app/ui/posts/file/imageFile";
import VideoFile from "@/app/ui/posts/file/videoFile";

const text = "text";
const image = "image";
const video = "video";

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
  if (fileType == text) {
    return <TextFile fileUrl={fileUrl} fileName={fileName} />;
  } else if (fileType == image) {
    return <ImageFile fileUrl={fileUrl} fileName={fileName} />;
  } else if (fileType == video) {
    return <VideoFile fileUrl={fileUrl} fileName={fileName} />;
  }
}

import { FileTypes } from "@/app/lib/definitions";

const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp", "svg"];
const videoExtensions = ["mp4", "mov", "avi", "mkv", "flv", "wmv", "webm"];

function getFileExtension(fileName: string): string {
  const lastDotIndex = fileName.lastIndexOf(".");
  if (lastDotIndex !== -1) {
    return fileName.slice(lastDotIndex + 1).toLowerCase(); // Return the file extension in lowercase
  }
  return ""; // No file extension found
}

function isImage(fileName: string): boolean {
  const fileExtension = getFileExtension(fileName);
  return fileExtension != "" && imageExtensions.includes(fileExtension);
}

function isVideo(fileName: string): boolean {
  const fileExtension = getFileExtension(fileName);
  return fileExtension != "" && videoExtensions.includes(fileExtension);
}

export default function getFileTypeFromFileName(fileName: string): number {
  if (fileName == "") {
    return FileTypes.Other;
  } else if (isImage(fileName)) {
    return FileTypes.Image;
  } else if (isVideo(fileName)) {
    return FileTypes.Video;
  } else {
    return FileTypes.Other;
  }
}

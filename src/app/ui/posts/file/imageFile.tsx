"use client";
import { FileEssential } from "@/app/lib/definitions";
import Image from "next/image";
import { redirect } from "next/navigation";
export default function ImageFile({ file }: { file: FileEssential }) {
  return (
    <div
      className="flex aspect-auto h-full w-full items-center justify-center overflow-hidden"
      onClick={(event) => {
        redirect(file.url);
      }}
    >
      <Image
        src={file.url}
        alt={file.name}
        width={1920}
        height={1080}
        className="object-cover object-center"
      ></Image>
    </div>
  );
}

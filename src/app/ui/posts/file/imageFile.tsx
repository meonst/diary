"use client";
import { FileEssential } from "@/app/lib/definitions";
import Image from "next/image";
import Link from "next/link";
export default function ImageFile({ file }: { file: FileEssential }) {
  return (
    <div className="flex aspect-16/9 h-full w-full items-center justify-center overflow-hidden">
      <Link href={file.url}>
        <Image
          src={file.url}
          alt={file.name}
          width={1920}
          height={1080}
          className="object-cover object-center"
        ></Image>
      </Link>
    </div>
  );
}

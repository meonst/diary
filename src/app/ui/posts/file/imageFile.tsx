"use client";
import Image from "next/image";
import Link from "next/link";
export default function ImageFile({
  fileUrl,
  fileName,
}: {
  fileUrl: string;
  fileName: string;
}) {
  return (
    <div className="flex aspect-16/9 h-full w-full items-center justify-center overflow-hidden">
      <Link href={fileUrl}>
        <Image
          src={fileUrl}
          alt={fileName}
          width={1920}
          height={1080}
          className="object-cover object-center"
        ></Image>
      </Link>
    </div>
  );
}

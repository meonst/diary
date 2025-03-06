import Image from "next/image";

export default function ImageFile({
  fileUrl,
  fileName,
}: {
  fileUrl: string;
  fileName: string;
}) {
  return (
    <div className="row-span-2 flex aspect-16/9 h-full min-h-36 w-full items-center justify-center overflow-hidden">
      <Image
        src={fileUrl}
        alt={fileName}
        width={1920}
        height={1080}
        className="object-cover object-center"
      ></Image>
    </div>
  );
}

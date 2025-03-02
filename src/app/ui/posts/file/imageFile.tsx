import Image from "next/image";

export default function ImageFile({
  fileUrl,
  fileName,
}: {
  fileUrl: string;
  fileName: string;
}) {
  return (
    <Image src={fileUrl} alt={fileName} width={1920} height={1080}></Image>
  );
}

import Image from "next/image";

export default function ImageFile({ fileUrl, fileName }: { fileUrl: string, fileName: string }) {
    return (
        <Image src={fileUrl} alt={fileName} width="100" height="100"></Image>
    )
}
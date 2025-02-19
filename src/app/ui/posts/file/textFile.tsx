import Link from "next/link";
export default function TextFile({ fileUrl, fileName }: { fileUrl: string, fileName: string }) {

    return (
        <div>
            <Link href={fileUrl}>{fileName}</Link>
        </div>
    )
}
import Image from "next/image";

export default function ImageFile({ fileUrl, fileName }: { fileUrl: string, fileName: string }) {
    
    return (
        <img src={fileUrl} key={fileName}></img>
    )   
    // return (
    //     <Image src={file} alt={file}>{file}</Image>
    // )
}
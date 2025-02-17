import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { currentTime } from "../misc/time";
import { s3 } from "./client";
import { log } from "../debug/log";

const awsS3Bucket = process.env.MY_AWS_BUCKET;

async function getSignedFileUrl(fileName: string) {
    const params = {
        Bucket: awsS3Bucket,
        Key: fileName,
    };

    const command = new PutObjectCommand(params);
    const url = await getSignedUrl(s3, command, {
        expiresIn: 3600,
    });
    return url;
}

export async function uploadFile(file: any): Promise<string> {
    if (file.size == 0) return "";
    // file.name = currentTime().concat(" ").concat(file.name);
    const newName = currentTime().concat(" ").concat(file.name);

    const url: string = await getSignedFileUrl(newName);
    log(file.type, "filetype");
    try {
        const uploadRes = await fetch(url, {
            method: "PUT",
            body: file,
            headers: {
                "Content-type": file.type,
            },
        });

        return newName;
    } catch (err) {
        return "";
    }
}
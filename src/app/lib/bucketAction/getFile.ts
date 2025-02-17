import {
    GetObjectCommand,
    HeadObjectCommand
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { s3 } from "./client";
import { createWriteStream } from "fs";
const awsS3Bucket = process.env.MY_AWS_BUCKET;

export async function getSignedFileUrl(fileName: string) {
    const params = {
        Bucket: awsS3Bucket,
        Key: fileName
    };

    const command = new GetObjectCommand(params);
    
    const url = await getSignedUrl(s3, command, {
        expiresIn: 3600,
    });
    return url;
}

export async function getHead(fileName: string) {
    
    const params = {
        Bucket: awsS3Bucket,
        Key: fileName
    };
    const command = new HeadObjectCommand(params);
    try {
        const response = await s3.send(command);
        if (!response) return;
        return response;
    } catch (err) {
        console.log(err);
    }
}

export async function getFileWithName(fileName: string) {
    const params = {
        Bucket: awsS3Bucket,
        Key: fileName
    }
    const command = new GetObjectCommand(params);
    try {
        const response = await s3.send(command);
        if (!response) return;
        return response;
    } catch (err) {
        console.log(err);
    }
}

// export async function getFileWithUrl(url: string) {
//     const params = {
//         Bucket: awsS3Bucket,
//         Key: url,
//     }
//     const command = new GetObjectCommand(params);
//     const response = await s3.send(command);
//     return response;
// }

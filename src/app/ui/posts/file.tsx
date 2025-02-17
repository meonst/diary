import React from 'react';
import { getFileWithName, getHead, getSignedFileUrl } from '@/app/lib/bucketAction/getFile';
import TextFile from './file/textFile';
import ImageFile from './file/imageFile';
import VideoFile from './file/videoFile';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { log } from '@/app/lib/debug/log';

const text = "text";
const image = "image";
const video = "video";



export default async function File({ fileName }: { fileName: string }) {
    const header = await getHead(fileName);
    const contentType = header?.ContentType?.split("/")[0];
    const fileUrl: string = await getSignedFileUrl(fileName);

    if (contentType == text) {
        return (
            <TextFile fileUrl={fileUrl} fileName={fileName} />
        )
    } else if (contentType == image) {
        return (
            <ImageFile fileUrl={fileUrl} fileName={fileName} />
        )
    } else if (contentType == video) {
        return (
            <VideoFile fileUrl={fileUrl} fileName={fileName} />
        )
    }

}
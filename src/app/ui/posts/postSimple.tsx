import { PostData } from '@/app/lib/definitions';
import React from 'react';
import File from '@/app/ui/posts/file';
import { log } from '@/app/lib/debug/log';
import { dateString } from '@/app/lib/misc/time';
import DeleteButton from '@/app/ui/posts/delete/deleteButton';
export default function PostSimple({ postData }: { postData: PostData }) {
    const time = postData.time;
    const content = postData.content;
    const id = postData.id;

    const fileNameOne = postData.fileNameOne;
    const fileNameTwo = postData.fileNameTwo;
    const fileNameThree = postData.fileNameThree;
    const fileNameFour = postData.fileNameFour;

    const files: string[] = [];
    if (fileNameOne != "") files.push(fileNameOne);
    if (fileNameTwo != "") files.push(fileNameTwo);
    if (fileNameThree != "") files.push(fileNameThree);
    if (fileNameFour != "") files.push(fileNameFour);

    return (
        <div id={id} key={id}>
            <div>{content}</div>
            {
                files.map((fileName) => {
                    return (
                        <div key={fileName}>
                            <File fileName={fileName} />
                        </div>
                    )
                })
            }
            <div>{dateString(time)}</div>
            <DeleteButton postId={id} />
        </div>
    )
}
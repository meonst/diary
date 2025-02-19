import { PostData } from '@/app/lib/definitions';
import React from 'react';
import File from '@/app/ui/posts/file';
import { log } from '@/app/lib/debug/log';
import { dateString } from '@/app/lib/misc/time';
import DeleteButton from '@/app/ui/posts/delete/deleteButton';
export default function PostSimple({ postDataSimple }: { postDataSimple: PostData }) {
    const time = postDataSimple.time;
    const content = postDataSimple.content;
    const id = postDataSimple.id;

    const fileNameOne = postDataSimple.fileNameOne;
    const fileNameTwo = postDataSimple.fileNameTwo;
    const fileNameThree = postDataSimple.fileNameThree;
    const fileNameFour = postDataSimple.fileNameFour;

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
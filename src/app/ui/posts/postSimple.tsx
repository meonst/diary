import { PostDataSimple } from '@/app/lib/definitions';
import React from 'react';
import File from './file';
import { log } from '@/app/lib/debug/log';
import { dateString } from '@/app/lib/misc/time';

export default function PostSimple({ postDataSimple }: { postDataSimple: PostDataSimple}) {
    const title = postDataSimple.title;
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
        <div key={id}>
            <div key="title">{title}</div>
            <div key="time">{dateString(time)}</div>
            <div key="content">{content}</div>
                {
                    files.map((fileName) => {
                        return (
                            <div key={fileName}>
                                <File fileName={fileName} />
                            </div>
                        )
                    })
                }
        </div>
    )

    // <File fileName={fileNameTwo} />
    // <File fileName={fileNameThree} />
    // <File fileName={fileNameFour} />
    
    
}
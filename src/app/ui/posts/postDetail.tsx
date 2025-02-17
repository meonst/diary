import React from 'react';
export default function PostDetail(id: string) {
    const title = `title ${id}`;
    const time = `time ${id}`;
    const content = `content ${id}`;
    const file = `file ${id}`;

    return (
        <div>
            <div>
                <div>{title}</div>
                <div>{time}</div>
                <div>{content}</div>
                <div>{file}</div>
                <div>edit button</div>
            </div>
        </div>
    )
}

// should post and postDetail be a different component?
// plab is when people click the post, the component will pop up and show the detail

// two divisions for the 'inside' and 'outside' area
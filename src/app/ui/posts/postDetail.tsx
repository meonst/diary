import React from 'react';
export default function PostDetail(id: string)
{
    const title = `title ${id}`;
    const date = `date ${id}`;
    const content = `content ${id}`;
    const media = `media ${id}`;
    
    return (
        <div>
            <div> 
                <div>{title}</div>
                <div>{date}</div>
                <div>{content}</div>
                <div>{media}</div>
                <div>edit button</div>
            </div>
        </div>
    )
}

// should post and postDetail be a different component?
// plab is when people click the post, the component will pop up and show the detail

// two divisions for the 'inside' and 'outside' area
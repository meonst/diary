import React from 'react';

export default function Post({ id }: { id: string })
{
    const title = `title ${id}`;
    const date = `date ${id}`;
    const content = `content ${id}`;
    const media = `media ${id}`;
    return (
        <div>
            <div>{title}</div>
            <div>{date}</div>
            <div>{content}</div>
            <div>{media}</div>
        </div>
    )
}
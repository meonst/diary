'use client'
import React from 'react'
import insertPost from '@/app/lib/dbAction/insertPost'

async function createPost(formData: FormData) {
    const file = formData.get("file");
    insertPost(formData);
}

export default function MakePostForm() {
    return (
        <div className='border-black border-4'>
            <form action={createPost}>
                <input type="text" name="content" placeholder="content" className="border-2" />
                <input type="file" name="file" />
                <button type="submit">post</button>
            </form>
        </div>
    )
}
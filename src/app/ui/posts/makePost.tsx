'use client'
import React from 'react'
import insertPost from '@/app/lib/dbAction/insertPost'
import { uploadFile } from '@/app/lib/bucketAction/uploadFile';
// export type Post = {
//     id: string;
//     title: string;
//     content: string;
//     category: string;
//     time: string;
//     hidden: boolean;
//     fileNameOne: string;
//     fileNameTwo: string;
//     fileNameThree: string;
//     fileNameFour: string;
// }


async function createPost(formData: FormData) {
    let file = formData.get("file");
    insertPost(formData);
}

export default function makePost() {
    return (
        <div className='border-black border-4'>
            <form action={createPost}>
                <input type="text" name="title" placeholder="title" className="border-2" />
                <input type="text" name="content" placeholder="content" className="border-2" />
                <input type="text" name="category" placeholder="category" className="border-2" />
                <input type="file" name="file" />

                <button type="submit">post</button>
            </form>
        </div>
    )
}
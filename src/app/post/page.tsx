import React, { ReactElement } from 'react';
import MakePost from '@/app/ui/posts/makePost';
import Post from '@/app/ui/posts/postSimple';
import { PostDataSimple } from '../lib/definitions';
import PostDetail from '@/app/ui/posts/postDetail';
import { getFileWithName } from '../lib/bucketAction/getFile';
import File from '../ui/posts/file';
import { getPostDataSimple } from '../lib/dbAction/getPosts';
import { QueryResult, QueryResultRow } from '@vercel/postgres';
import  PostSimple from '../ui/posts/postSimple';
// export type PostData = {
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



export default async function Page() {

    const postDataSimpleArray: PostDataSimple[] = await getPostDataSimple();

    return (
        <div>
            {
                postDataSimpleArray.map((postDataSimple) => {
                    return (
                        <div key={postDataSimple["id"]}>
                            <PostSimple postDataSimple={postDataSimple}></PostSimple>
                        </div>)
                })
            }
        </div>
    )

}
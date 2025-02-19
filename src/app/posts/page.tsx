import React from 'react';
import MakePost from '@/app/ui/posts/makePost';
import { PostData } from '@/app/lib/definitions';
import { getPostData } from '@/app/lib/dbAction/getPosts';
import PostSimple from '@/app/ui/posts/postSimple';

export default async function Page() {

    const postDataSimpleArray: PostData[] = await getPostData();

    return (
        <div>
            <MakePost />
            {
                postDataSimpleArray.map((postDataSimple) => {
                    return (
                        <PostSimple postDataSimple={postDataSimple} key={postDataSimple["id"]}></PostSimple>
                    )
                })
            }
        </div>
    )

}
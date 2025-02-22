import React from 'react';
import MakePostForm from '@/app/ui/posts/makePostForm';
import { PostData } from '@/app/lib/definitions';
import { getPostData } from '@/app/lib/dbAction/getPosts';
import PostSimple from '@/app/ui/posts/postSimple';

export default async function Page() {
    const postDataArray: PostData[] = await getPostData();
    return (
        <div>
            <MakePostForm />
            {
                postDataArray.map((postData) => {
                    return (
                        <PostSimple postData={postData} key={postData["id"]} />
                    )
                })
            }
        </div>
    )

}
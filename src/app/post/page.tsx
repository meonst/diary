import React from 'react';
import MakePost from '@/app/ui/posts/makePost';
import Post from '@/app/ui/posts/post';
import PostDetail from '@/app/ui/posts/postDetail';
export default function Page() {
    return (
        <div>
            <MakePost />
            <Post id={"1"}></Post>
            <Post id={"2"}></Post>
            <Post id={"3"}></Post>
            <Post id={"4"}></Post>
        </div>
    )
}
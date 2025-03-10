'use client'
import Image from "next/image";
import { useInView } from "react-intersection-observer"
import { useEffect, useState } from "react";
import { getPostData } from "@/app/lib/dbAction/getPosts";
import { PostData } from "@/app/lib/definitions";
import PostSimple from "@/app/ui/posts/postSimple";
export default function LoadMore({isAdmin}: {isAdmin: boolean}) {
  const { ref, inView } = useInView();
  const [postData, setPostData] = useState<PostData[]>([]);
  useEffect(() => {
    if (inView) { 
      getPostData().then((res) => {
        setPostData([...postData, ...res])  
      })
      
    }
  }, [inView, postData]);

  return (
    <div>
      {postData.map((postData: PostData, index: number) => {
        return <PostSimple postData={postData} isAdmin={isAdmin} key={index} />;
      })}
      <div ref={ref}>Loading</div>

    </div>
  );
}
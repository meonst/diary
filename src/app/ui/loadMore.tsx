"use client";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { getPostData } from "@/app/lib/dbAction/getPosts";
import { PostData } from "@/app/lib/definitions";
import PostSimple from "@/app/ui/posts/postSimple";

let page = 0;
let reachedBottom = false;
export default function LoadMore({ isAdmin }: { isAdmin: boolean }) {
  const { ref, inView } = useInView();
  const [postData, setPostData] = useState<PostData[]>([]);
  useEffect(() => {
    if (inView && !reachedBottom) {
      getPostData(page).then((res) => {
        setPostData([...postData, ...res]);
        if (res.length < 30) reachedBottom = true;
        page++;
      });
    }
  }, [inView, postData]);

  return (
    <div>
      {postData.map((postData: PostData, index: number) => {
        return <PostSimple postData={postData} isAdmin={isAdmin} key={index} />;
      })}
      {!reachedBottom && (
        <div ref={ref} className="text-center">
          Loading
        </div>
      )}
      {reachedBottom && (
        <div className="text-center">
          It seems like you touched Rock Bottom! Nothing to see anymore!
        </div>
      )}
    </div>
  );
}

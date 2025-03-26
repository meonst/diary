"use client";
import { useInView } from "react-intersection-observer";
import { SetStateAction, useEffect, useState } from "react";
import { getPostData } from "@/app/lib/dbAction/getPosts";
import { PostData } from "@/app/lib/definitions";
import PostSimple from "@/app/ui/posts/postSimple";
import Loading from "@/app/ui/loading";
export default function PostLoader({ isAdmin }: { isAdmin: boolean }) {
  const [postData, setPostData] = useState<PostData[]>([]);
  const [reachedBottom, setReachedBottom] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && !reachedBottom) {
      getPostData(new FormData(), page).then((res) => {
        setPostData([...postData, ...res]);
        if (res.length < 30) setReachedBottom(true);
        setPage(page + 1);
      });
    }
  }, [inView, postData, page, reachedBottom]);

  return (
    <div>
      {postData.map((postData: PostData, index: number) => {
        return <PostSimple postData={postData} isAdmin={isAdmin} key={index} />;
      })}
      {!reachedBottom && (
        <div ref={ref} className="text-center">
          <Loading></Loading>
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

export function PostLoaderControlledByParent({
  formData,
  isAdmin,
  postData,
  setPostData,
  reachedBottom,
  setReachedBottom,
  page,
  setPage,
}: {
  formData: FormData;
  isAdmin: boolean;
  postData: PostData[];
  setPostData: (value: SetStateAction<PostData[]>) => void;
  reachedBottom: boolean;
  setReachedBottom: (value: SetStateAction<boolean>) => void;
  page: number;
  setPage: (value: SetStateAction<number>) => void;
}) {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && !reachedBottom) {
      getPostData(formData, page).then((res) => {
        setPostData([...postData, ...res]);
        if (res.length < 30) {
          setReachedBottom(true);
          setPage(0);
        }
        setPage(page + 1);
      });
    }
  }, [
    inView,
    formData,
    postData,
    setPostData,
    reachedBottom,
    setReachedBottom,
    page,
    setPage,
  ]);

  return (
    <div>
      {postData.map((postData: PostData, index: number) => {
        return <PostSimple postData={postData} isAdmin={isAdmin} key={index} />;
      })}
      {!reachedBottom && (
        <div ref={ref} className="text-center">
          <Loading></Loading>
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

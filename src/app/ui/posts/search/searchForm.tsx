"use client";
import { getPostDataSearch } from "@/app/lib/dbAction/getPosts";
import { z } from "zod";
import { dateString } from "@/app/lib/misc/time";
import { useState } from "react";
import { PostData } from "@/app/lib/definitions";
import PostSimple from "@/app/ui/posts/postSimple";
export default function SearchForm({ isAdmin }: { isAdmin: boolean }) {
  let page = 0;
  const [postData, setPostData] = useState<PostData[]>([]);
  return (
    <div>
      <form
        className="grid grid-cols-2"
        action={async (formData: FormData) => {
          const data = await getPostDataSearch(formData, page);
          setPostData(data);
          page++;
        }}
      >
        <input
          type="text"
          name="searchText"
          placeholder="search text"
          className="col-span-2 border-1"
        />
        <div className="col-span-2">
          <input
            type="date"
            name="startDate"
            className="border-1"
            defaultValue={dateString(new Date())}
          />
          ~
          <input
            type="date"
            name="endDate"
            className="border-1"
            defaultValue={dateString(new Date())}
          />
        </div>
        <label className="col-span-2 flex justify-center border-1">
          Limit search to posts with files
          <input type="checkbox" name="hasFile" className="ml-2" />
        </label>

        <button type="reset" className="border-1">
          reset
        </button>
        <button type="submit" className="border-1">
          submit
        </button>
      </form>
      {postData.map((postData: PostData, index: number) => {
        return <PostSimple postData={postData} isAdmin={isAdmin} key={index} />;
      })}
    </div>
  );
}

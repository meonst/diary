"use client";
import React from "react";
import { useState } from "react";
import insertComment from "@/app/lib/dbAction/insertComment";
import Loading from "@/app/ui/loading";
let content: string = "";
export default function MakeCommentForm({ postId }: { postId: string }) {
  const [uploading, setUploading] = useState<boolean>(false);

  function makeComment() {
    if (content == "") {
      setUploading(false);
      return;
    }
    insertComment(postId, content);
    setUploading(false);
  }

  return (
    <div className="h-fit min-h-24 w-full rounded-md border-2 border-gray-300">
      {uploading && (
        <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center bg-gray-800/20">
          <Loading></Loading>
        </div>
      )}
      <form
        action={makeComment}
        onSubmit={() => {
          setUploading(true);
        }}
        className=""
      >
        <div className="w-full">
          <textarea
            onChange={(event) => {
              content = event.target.value;
              event.target.style.height = "auto";
              event.target.style.height = `${event.target.scrollHeight}px`;
            }}
            placeholder="Write a comment!"
            className="max-h-66 min-h-22 w-full resize-none p-2"
          ></textarea>
        </div>
        <div className="flex w-full">
          <div className="flex-grow"></div>
          <button
            className="pr-2 text-right text-xl"
            type="submit"
            disabled={uploading}
          >
            ✍️
          </button>
        </div>
      </form>
    </div>
  );
}

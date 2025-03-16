"use client";
import { dateString } from "@/app/lib/misc/time";
import { useState, useEffect } from "react";
import { PostLoaderControlledByParent } from "@/app/ui/posts/postLoader";
import { daysBefore } from "@/app/lib/misc/time";
import { PostData } from "@/app/lib/definitions";
export default function SearchForm({ isAdmin }: { isAdmin: boolean }) {
  const [formData, setFormData] = useState<FormData>(new FormData());
  const [dates, setDates] = useState<string[]>(["", dateString(new Date())]);
  const [reachedBottom, setReachedBottom] = useState<boolean>(false);
  const [postData, setPostData] = useState<PostData[]>([]);
  const [page, setPage] = useState<number>(0);

  function changeDateInterval(days: number) {
    setDates([dateString(daysBefore(days)), dateString(new Date())]);
  }
  return (
    <div>
      <form
        className="grid grid-cols-2"
        action={(newFormData: FormData) => {
          setPostData([]);
          setFormData(newFormData);
          setReachedBottom(false);
        }}
      >
        <input
          type="text"
          name="searchText"
          placeholder="search text"
          className="col-span-2 border-1"
        />
        <div className="col-span-2 flex content-evenly justify-evenly border-1">
          <input
            type="date"
            name="startDate"
            className="pr-2"
            defaultValue={dates[0]}
          />
          ~
          <input
            type="date"
            name="endDate"
            className="border-r-1 pl-2"
            defaultValue={dates[1]}
          />
          <div className="flex flex-grow content-evenly justify-evenly">
            <label
              className="pr-1 pl-1"
              onClick={() => {
                changeDateInterval(30);
              }}
            >
              1 month
            </label>
            <label
              className="pr-1 pl-1"
              onClick={() => {
                changeDateInterval(90);
              }}
            >
              3 months
            </label>
            <label
              className="pr-1 pl-1"
              onClick={() => {
                changeDateInterval(180);
              }}
            >
              6 months
            </label>
            <label
              className="pr-1 pl-1"
              onClick={() => {
                changeDateInterval(365);
              }}
            >
              1 year
            </label>
          </div>
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
      <PostLoaderControlledByParent
        formData={formData}
        isAdmin={isAdmin}
        postData={postData}
        setPostData={setPostData}
        reachedBottom={reachedBottom}
        setReachedBottom={setReachedBottom}
        page={page}
        setPage={setPage}
      ></PostLoaderControlledByParent>
    </div>
  );
}

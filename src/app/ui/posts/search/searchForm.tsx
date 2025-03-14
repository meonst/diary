"use client";
import { dateString } from "@/app/lib/misc/time";
import { useState, useEffect } from "react";
import PostLoader from "@/app/ui/posts/postLoader";
export default function SearchForm({ isAdmin }: { isAdmin: boolean }) {
  const [formData, setFormData] = useState<FormData>(new FormData());
  let shouldReset = false;
  return (
    <div>
      <form
        className="grid grid-cols-2"
        action={(newFormData: FormData) => {
          console.log(newFormData.get('searchText'));
          console.log(newFormData.get('startDate'));
          console.log(newFormData.get('endDate'));
          console.log(newFormData.get('hasFile'));
          setFormData(newFormData);
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
            defaultValue={""}
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
      <PostLoader formData={formData} isAdmin={isAdmin}></PostLoader>
    </div>
  );
}

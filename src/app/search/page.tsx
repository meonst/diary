import React from "react";
import MakePostForm from "@/app/ui/posts/makePostForm";
import { verifySession } from "../lib/authentication/dal";
import LoadMore from "@/app/ui/loadMore";
import SearchForm from "@/app/ui/posts/search/searchForm";
export default async function Page() {
  const session = await verifySession();
  const isAdmin = session.isAuth && session.userRole == "admin";
  return (
    <div className="flex columns-3 flex-col items-center">
      <div className="xs:w-xl max-w-xl">
        <SearchForm isAdmin={isAdmin}></SearchForm>
      </div>
    </div>
  );
}

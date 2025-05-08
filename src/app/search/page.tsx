import React from "react";
import { getSessionInfo } from "../lib/authentication/dal";
import SearchForm from "@/app/ui/posts/search/searchForm";
import { SessionInfo } from "@/app/lib/definitions";
export default async function Page() {
  const sessionInfo: SessionInfo = await getSessionInfo();

  return (
    <div className="flex columns-3 flex-col items-center">
      <div className="xs:w-xl max-w-xl">
        <SearchForm isAdmin={sessionInfo.isAdmin}></SearchForm>
      </div>
    </div>
  );
}

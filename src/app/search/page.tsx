import React from "react";
import { verifyAdmin } from "../lib/authentication/dal";
import SearchForm from "@/app/ui/posts/search/searchForm";
export default async function Page() {
  const isAdmin = await verifyAdmin();

  return (
    <div className="flex columns-3 flex-col items-center">
      <div className="xs:w-xl max-w-xl">
        <SearchForm isAdmin={isAdmin}></SearchForm>
      </div>
    </div>
  );
}

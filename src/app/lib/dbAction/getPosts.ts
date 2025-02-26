"use server";
import { sql, QueryResult, QueryConfig } from "@vercel/postgres";
import { checkString } from "@/app/lib/misc/data";
import { PostData } from "@/app/lib/definitions";

export async function getPostData(): Promise<PostData[]> {
  const queryConfig: QueryConfig = {
    text: `SELECT id, content, time, file_name_one, file_name_two, file_name_three, file_name_four FROM posts WHERE hidden = '0' ORDER BY time DESC LIMIT 30`,
  };

  const postRows: QueryResult = await sql.query(queryConfig);

  const postDataSimpleArray: PostData[] = [];
  postRows.rows.forEach((row) => {
    const data: PostData = {
      id: row["id"],
      content: row["content"],
      time: new Date(row["time"]),
      fileNameOne: checkString(row["file_name_one"]),
      fileNameTwo: checkString(row["file_name_two"]),
      fileNameThree: checkString(row["file_name_three"]),
      fileNameFour: checkString(row["file_name_four"]),
    };
    postDataSimpleArray.push(data);
  });

  return postDataSimpleArray;
}

export async function getPostDataSearch(
  searchText: string,
): Promise<PostData[]> {
  searchText = "%".concat(searchText).concat("%");
  const queryConfig: QueryConfig = {
    text: `SELECT id, content, time, file_name_one, file_name_two, file_name_three FROM posts WHERE hidden = '0' AND ILIKE $1 ORDER BY time DESC LIMIT 30`,
    values: [searchText],
  };

  const postRows: QueryResult = await sql.query(queryConfig);

  const postDataSimpleArray: PostData[] = [];
  postRows.rows.forEach((row) => {
    const data: PostData = {
      id: row["id"],
      content: row["content"],
      time: new Date(row["time"]),
      fileNameOne: checkString(row["file_name_one"]),
      fileNameTwo: checkString(row["file_name_two"]),
      fileNameThree: checkString(row["file_name_three"]),
      fileNameFour: checkString(row["file_name_four"]),
    };
    postDataSimpleArray.push(data);
  });

  return postDataSimpleArray;
}

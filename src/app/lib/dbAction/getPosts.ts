"use server";
import { sql, QueryResult, QueryConfig } from "@vercel/postgres";
import { checkString } from "@/app/lib/misc/data";
import { FileEssential, PostData } from "@/app/lib/definitions";
import { getSignedFileUrl } from "@/app/lib/bucketAction/getFile";
import getFileTypeFromFileName from "@/app/lib/misc/fileType";

const postsPerPage = 30;
export async function getPostData(page: number): Promise<PostData[]> {
  const offset: number = page * postsPerPage;
  const queryConfig: QueryConfig = {
    text: `SELECT id, content, time, file_name_one, file_name_two, file_name_three, file_name_four FROM posts WHERE hidden = '0' ORDER BY time DESC OFFSET $1 LIMIT $2`,
    values: [offset, postsPerPage],
  };

  const postRows: QueryResult = await sql.query(queryConfig);
  const postDataArray: PostData[] = await getPostDataArray(postRows);
  return postDataArray;
}

export async function getPostDataSearch(
  searchText: string,
): Promise<PostData[]> {
  searchText = "%".concat(searchText).concat("%");
  const queryConfig: QueryConfig = {
    text: `SELECT id, content, time, file_name_one, file_name_two, file_name_three FROM posts WHERE hidden = '0' AND LIKE $1 ORDER BY time DESC LIMIT 30`,
    values: [searchText],
  };

  const postRows: QueryResult = await sql.query(queryConfig);
  const postDataArray: PostData[] = await getPostDataArray(postRows);
  return postDataArray;
}

async function getPostDataArray(postRows: QueryResult) {
  const postDataArray: PostData[] = [];
  for (let i = 0; i < postRows.rows.length; i++) {
    const row = postRows.rows[i];

    const fileNameOne = checkString(row["file_name_one"]);
    const fileNameTwo = checkString(row["file_name_two"]);
    const fileNameThree = checkString(row["file_name_three"]);
    const fileNameFour = checkString(row["file_name_four"]);

    const fileOne: FileEssential = {
      name: fileNameOne,
      url: await getSignedFileUrl(fileNameOne),
      type: getFileTypeFromFileName(fileNameOne),
    };

    const fileTwo: FileEssential = {
      name: fileNameTwo,
      url: await getSignedFileUrl(fileNameTwo),
      type: getFileTypeFromFileName(fileNameTwo),
    };

    const fileThree: FileEssential = {
      name: fileNameThree,
      url: await getSignedFileUrl(fileNameThree),
      type: getFileTypeFromFileName(fileNameThree),
    };

    const fileFour: FileEssential = {
      name: fileNameFour,
      url: await getSignedFileUrl(fileNameFour),
      type: getFileTypeFromFileName(fileNameFour),
    };

    const data: PostData = {
      id: row["id"],
      content: row["content"],
      time: new Date(row["time"]),
      fileOne: fileOne,
      fileTwo: fileTwo,
      fileThree: fileThree,
      fileFour: fileFour,
    };
    postDataArray.push(data);
  }
  return postDataArray;
}

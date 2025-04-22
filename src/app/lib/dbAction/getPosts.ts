"use server";
import { sql, QueryResult, QueryConfig } from "@vercel/postgres";
import { checkString } from "@/app/lib/misc/data";
import { FileEssential, PostData } from "@/app/lib/definitions";
import { getSignedFileUrl } from "@/app/lib/bucketAction/getFile";
import getFileTypeFromFileName from "@/app/lib/misc/fileType";
import { z } from "zod";

const postsPerPage = 30;

export async function getPostData(
  formData: FormData,
  page: number,
): Promise<PostData[]> {
  const searchTextSchema = z.object({
    searchText: z.string(),
  });
  const startDateSchema = z.object({
    startDate: z.string(),
  });
  const endDateSchema = z.object({
    endDate: z.string(),
  });
  const hasFileSchema = z.object({
    hasFile: z.string(),
  });

  const searchTextValidate = searchTextSchema.safeParse({
    searchText: formData.get("searchText"),
  });
  const startDateValidate = startDateSchema.safeParse({
    startDate: formData.get("startDate"),
  });
  const endDateValidate = endDateSchema.safeParse({
    endDate: formData.get("endDate"),
  });
  const hasFileValidate = hasFileSchema.safeParse({
    hasFile: formData.get("hasFile"),
  });

  let queryText =
    "SELECT id, content, time, file_name_one, file_name_two, file_name_three, file_name_four FROM posts WHERE hidden = '0'";
  let variableCount: number = 0;
  const values = [];
  if (searchTextValidate.success && searchTextValidate.data.searchText != "") {
    variableCount++;
    queryText = queryText.concat(` AND content LIKE $${variableCount}`);
    values.push("%".concat(searchTextValidate.data.searchText).concat("%"));
  }
  if (startDateValidate.success && startDateValidate.data.startDate != "") {
    variableCount++;
    queryText = queryText.concat(` AND $${variableCount} < time`);
    values.push(startDateValidate.data.startDate);
  }
  if (endDateValidate.success && endDateValidate.data.endDate != "") {
    variableCount++;
    queryText = queryText.concat(` AND time < $${variableCount}`);
    values.push(endDateValidate.data.endDate);
  }
  if (hasFileValidate.success) {
    queryText = queryText.concat(" AND file_name_one <> ''");
  }
  variableCount++;
  const offsetText = ` ORDER BY time DESC OFFSET $${variableCount} LIMIT $${variableCount + 1}`;
  queryText = queryText.concat(offsetText);
  const offset: number = page * postsPerPage;
  values.push(offset);
  values.push(postsPerPage);
  const queryConfig: QueryConfig = {
    text: queryText,
    values: values,
  };
  const postRows: QueryResult = await sql.query(queryConfig);
  const postDataArray: PostData[] = await getPostDataArray(postRows);
  return postDataArray;
}

export async function getPostDataWithId(id: string): Promise<PostData[]> {
  const queryText =
    "SELECT id, content, time, file_name_one, file_name_two, file_name_three, file_name_four FROM posts WHERE id = $1";
  const values = [id];
  const queryConfig: QueryConfig = {
    text: queryText,
    values: values,
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

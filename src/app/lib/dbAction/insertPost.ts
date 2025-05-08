"use server";
import { QueryConfig, sql } from "@vercel/postgres";
import { uploadFile } from "@/app/lib/bucketAction/uploadFile";
import { currentTime } from "@/app/lib/misc/time";
import { getSessionInfo } from "@/app/lib/authentication/dal";
import { SessionInfo } from "@/app/lib/definitions";

export default async function insertPost(files: File[], content: string) {
  const isAdmin: SessionInfo = await getSessionInfo();
  if (!isAdmin) return;

  const fileNames: string[] = [];
  for (let i = 0; i < files.length; i++) {
    fileNames.push(await uploadFile(files[i]));
  }
  while (fileNames.length < 4) fileNames.push("");

  const time = currentTime();
  const queryConfig: QueryConfig = {
    text: `
			INSERT INTO posts (content, time, hidden, file_name_one, file_name_two, file_name_three, file_name_four) 
			VALUES ($1, $2, 0, $3, $4, $5, $6)
		`,
    values: [
      content,
      time,
      fileNames[0],
      fileNames[1],
      fileNames[2],
      fileNames[3],
    ],
  };
  await sql.query(queryConfig);
}

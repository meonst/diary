"use server";
import { z } from "zod";
import { QueryConfig, sql } from "@vercel/postgres";
import { uploadFile } from "@/app/lib/bucketAction/uploadFile";
import { currentTime } from "@/app/lib/misc/time";
import { verifySession } from "@/app/lib/authentication/dal";

const FormSchema = z.object({
  content: z.string(),
});

export default async function insertPost(formData: FormData, files: File[]) {
  const session = await verifySession();
  if (!session || !session.isAuth || session.userRole != "admin") return;

  const { content } = FormSchema.parse({
    content: formData.get("content"),
  });
  console.log(content);

  const fileNames: string[] = [];
  for (let i = 0; i < files.length; i++) {
    fileNames.push(await uploadFile(files[i]));
  }
  while (fileNames.length < 4) fileNames.push("");
  console.log(fileNames);

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

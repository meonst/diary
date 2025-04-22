"use server";
import { QueryConfig, sql } from "@vercel/postgres";
import { currentTime } from "@/app/lib/misc/time";
import { verifySession } from "@/app/lib/authentication/dal";

export default async function insertComment(postId: string, content: string) {
  const { userId, userEmail } = await verifySession();

  const time = currentTime();
  const queryConfig: QueryConfig = {
    text: `
      INSERT INTO comments (content, time, author_id, author_email, parentId, hidden) 
      VALUES ($1, $2, $3, $4, $5, 0)
    `,
    values: [content, time, userId, userEmail, postId],
  };
  await sql.query(queryConfig);
}

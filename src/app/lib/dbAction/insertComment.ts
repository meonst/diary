"use server";
import { QueryConfig, sql } from "@vercel/postgres";
import { currentTime } from "@/app/lib/misc/time";
import { getSessionInfo } from "@/app/lib/authentication/dal";
import { SessionInfo } from "@/app/lib/definitions";

export default async function insertComment(postId: string, content: string) {
  const sessionInfo: SessionInfo = await getSessionInfo();
  if (!sessionInfo.isAuth) return;
  const time = currentTime();
  const queryConfig: QueryConfig = {
    text: `
      INSERT INTO comments (content, time, author_id, author_email, parentId, hidden) 
      VALUES ($1, $2, $3, $4, $5, 0)
    `,
    values: [content, time, sessionInfo.userId, sessionInfo.userEmail, postId],
  };
  await sql.query(queryConfig);
}

"use server";
import { QueryConfig, sql } from "@vercel/postgres";
export default async function hideComment(commentId: string) {
  const queryConfig: QueryConfig = {
    text: `UPDATE comments SET hidden = '1' where id = $1`,
    values: [commentId],
  };
  await sql.query(queryConfig);
}

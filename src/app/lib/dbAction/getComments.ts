"use server";
import { sql, QueryResult, QueryConfig } from "@vercel/postgres";
import { CommentData } from "@/app/lib/definitions";

export async function getComments(postId: string): Promise<CommentData[]> {
  const queryText =
    "SELECT id, content, time, author_id, author_email FROM comments WHERE hidden = '0' AND parentId = $1";
  const values = [postId];
  const queryConfig: QueryConfig = {
    text: queryText,
    values: values,
  };
  const postRows: QueryResult = await sql.query(queryConfig);
  const commentDataArray: CommentData[] = await getCommentDataArray(postRows);
  return commentDataArray;
}

async function getCommentDataArray(postRows: QueryResult) {
  const postDataArray: CommentData[] = [];
  for (let i = 0; i < postRows.rows.length; i++) {
    const row = postRows.rows[i];

    const data: CommentData = {
      id: row["id"],
      authorId: row["author_id"],
      authorEmail: row["author_email"],
      content: row["content"],
      time: new Date(row["time"]),
    };
    postDataArray.push(data);
  }
  return postDataArray;
}

'use server';
import { QueryConfig, sql } from '@vercel/postgres';
export default async function hidePost(postId: string) {
    const queryConfig: QueryConfig = {
        text: `UPDATE posts SET hidden = '1' where id = $1`,
        values: [postId],
    };
    await sql.query(queryConfig)
}

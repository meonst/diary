'use server';
import { z } from 'zod';
import { sql, Query, QueryParse, QueryResult, QueryResultRow } from '@vercel/postgres';
import { log } from '../debug/log';
import { checkString } from '../misc/data';
import { PostDataSimple } from '../definitions';
export async function getPostDataSimple(): Promise<PostDataSimple[]> {
    const postRows: QueryResult = await sql`SELECT id, title, content, category, time, file_name_one, file_name_two, file_name_three FROM posts ORDER BY time DESC LIMIT 30`;

    const postDataSimpleArray: PostDataSimple[] = []; 
    postRows.rows.forEach((row) => {
        const postDataSimple: PostDataSimple = {
            id: row["id"],
            title: row["title"],
            content: row["content"],
            category: row["category"],
            time: new Date(row["time"]),
            fileNameOne: checkString(row["file_name_one"]),
            fileNameTwo: checkString(row["file_name_two"]),
            fileNameThree: checkString(row["file_name_three"]),
            fileNameFour: checkString(row["file_name_four"]),
        }
        log(postDataSimple, "simple")
        postDataSimpleArray.push(postDataSimple)
    })
                        
    return postDataSimpleArray;
}

'use server';
import { z } from 'zod';
import { sql, Query, QueryParse } from '@vercel/postgres';
import { Post } from '@/app/lib/definitions'

// export async function getPost() {
//     sql`SELECT TOP 100 FROM POST`
// }
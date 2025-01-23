'use server';
import { z } from 'zod';
import { sql, Query, QueryParse } from '@vercel/postgres';
import { Post } from '@/app/lib/definitions'
// export type Post = {
//     id: string;
//     title: string;
//     content: string;
//     category: string;
//     date: string;
//     hidden: boolean;
//     mediaLinkOne: string;
//     mediaLinkTwo: string;
//     mediaLinkThree: string;
//     mediaLinkFour: string;
// }
const FormSchema = z.object({
    id: z.string(),
    title: z.string(),
    content: z.string(),
    category: z.string(),
    date: z.string(),
    hidden: z.boolean(),
    mediaLinkOne: z.string(),
    mediaLinkTwo: z.string(),
    mediaLinkThree: z.string(),
    mediaLinkFour: z.string(),
})

const CreatePost = FormSchema.omit({ id: true, date: true, hidden: true})

export type State = {
    errors?: {
        customerId?: string[];
        amount?: string[];
        status?: string[];
    };
    message?: string | null;
};



export async function createPost(formData: FormData) {
    const { title, content, category, mediaLinkOne, mediaLinkTwo, mediaLinkThree, mediaLinkFour } = CreatePost.parse({
        title: formData.get('title'),
        content: formData.get('content'),
        category: formData.get('category'),
        mediaLinkOne: formData.get('mediaLinkOne'),
        mediaLinkTwo: formData.get('mediaLinkTwo'),
        mediaLinkThree: formData.get('mediaLinkThree'),
        mediaLinkFour: formData.get('mediaLinkFour')
    });

    const date = new Date().toISOString().split('T')[0];

    await sql`INSERT INTO POSTS (title, content, category, date, hidden, mediaLinkOne, mediaLinkTwo, mediaLinkThree, mediaLinkFour)
        VALUES (${title}, ${content}, ${category}, ${date}, FALSE, ${mediaLinkOne}, ${mediaLinkTwo}, ${mediaLinkThree}, ${mediaLinkFour})`
}

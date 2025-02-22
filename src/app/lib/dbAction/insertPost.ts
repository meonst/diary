'use server';
import { z } from 'zod';
import { QueryConfig, sql } from '@vercel/postgres';
import { uploadFile } from '@/app/lib/bucketAction/uploadFile';
import { currentTime } from '@/app/lib/misc/time';

const FormSchema = z.object({
    id: z.string(),
    title: z.string(),
    content: z.string(),
    category: z.string(),
    time: z.string(),
    hidden: z.boolean(),
    file: z.any(),
    fileNameOne: z.string(),
    fileNameTwo: z.string(),
    fileNameThree: z.string(),
    fileNameFour: z.string()
})

const CreatePost = FormSchema.omit({ id: true, time: true, hidden: true, fileNameOne: true, fileNameTwo: true, fileNameThree: true, fileNameFour: true})

export default async function insertPost(formData: FormData) {
    const { title, content, category, file } = CreatePost.parse({
        title: formData.get('title'),
        content: formData.get('content'),
        category: formData.get('category'),
        file: formData.get('file')
    });
    const fileNameOne: string = await uploadFile(file);
    const fileNameTwo: string = "";
    const fileNameThree: string = "";
    const fileNameFour: string = "";
    const time = currentTime();
    const queryConfig: QueryConfig = {
        text: `
        INSERT INTO posts (content, time, hidden, file_name_one, file_name_two, file_name_three, file_name_four) 
        VALUES ($1, $2, 0, $3, $4, $5, $6)
        `,
        values: [title, content, category, time, fileNameOne, fileNameTwo, fileNameThree, fileNameFour]
    }
    await sql.query(queryConfig);
}

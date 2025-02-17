'use server';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { uploadFile } from '../bucketAction/uploadFile';
import { currentTime } from '../misc/time';

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

export type State = {
    errors?: {
        customerId?: string[];
        amount?: string[];
        status?: string[];
    };
    message?: string | null;
};


export default async function insertPost(formData: FormData) {
    const { title, content, category, file } = CreatePost.parse({
        title: formData.get('title'),
        content: formData.get('content'),
        category: formData.get('category'),
        file: formData.get('file')
    });
    // console.log('console log manual start')
    // console.log(file);
    const fileNameOne: string = await uploadFile(file);
    const fileNameTwo: string = "";
    const fileNameThree: string = "";
    const fileNameFour: string = "";

    // console.log('console log manual end')
    const time = currentTime();

    await sql`INSERT INTO posts (title, content, category, time, hidden, file_name_one, file_name_two, file_name_three, file_name_four)
        VALUES (${title}, ${content}, ${category}, ${time}, 0, ${fileNameOne}, ${fileNameTwo}, ${fileNameThree}, ${fileNameFour})`
}

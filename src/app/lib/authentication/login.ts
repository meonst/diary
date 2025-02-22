
'use server';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { QueryConfig, QueryResult } from '@vercel/postgres';
import bcrypt from 'bcrypt'
import { LoginFormSchema } from '@/app/lib/definitions';
import { createSession } from '@/app/lib/authentication/session';
import { checkString } from '@/app/lib/misc/data';
import { redirect } from 'next/navigation';
import { LoginFormState } from '@/app/lib/definitions';


export default async function handleLogin(state: LoginFormState, formData: FormData) {

    const validatedFields = LoginFormSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password")
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const { email, password } = validatedFields.data
    

    const queryConfig: QueryConfig = {
        text: `SELECT id, email, password FROM users WHERE email = $1`,
        values: [email]
    };


    const userRows: QueryResult = await sql.query(queryConfig);
    if (userRows.rowCount == 1)
    {
        const hashedPassword = checkString(userRows.rows[0]["password"]);
        if (await bcrypt.compare(password, hashedPassword)) {
            const userId: string = checkString(userRows.rows[0]["id"]);
            await createSession(userId)
            redirect('/posts')
        } else {
            return {
                password: ["Incorrect Password"]
            }
        }
    } else {
        return {
            password: ["This email is not registered"]
        }
    }

}

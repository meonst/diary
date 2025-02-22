'use server';
import { sql } from '@vercel/postgres';
import { QueryConfig, QueryResult } from '@vercel/postgres';
import bcrypt from 'bcrypt'
import { SignUpFormSchema } from '@/app/lib/definitions';
import { redirect } from 'next/navigation';
import { currentTime } from '@/app/lib/misc/time';
import { SignUpFormState } from '@/app/lib/definitions';
async function isExistingEmail(email: string): Promise<boolean> {
    const queryConfig: QueryConfig = {
        text: `SELECT id, email FROM users WHERE email = $1`,
        values: [email]
    };

    const userRows: QueryResult = await sql.query(queryConfig);
    return (userRows.rowCount != 0)
}

export default async function handleSignUp(state: SignUpFormState, formData: FormData) {

    const validatedFields = SignUpFormSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
        repeatPassword: formData.get("repeatPassword")
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const { email, password, repeatPassword } = validatedFields.data

    if (password != repeatPassword) {
        return {
            errors: {repeatPassword: ["Password doesn't match"]}
        }
    }   
    
    if (await isExistingEmail(email)) {
        return {
            errors: {email: ["This email is already being used"]}
        }
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const queryConfig: QueryConfig = {
        text: `INSERT INTO users (email, password, time) VALUES ($1, $2, $3)`,
        values: [email, hashedPassword, currentTime()]
    };
    
    const queryResult: QueryResult = await sql.query(queryConfig);
    console.log(queryResult)

    redirect('/authenticate/login')
}

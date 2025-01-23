'use server';
import { custom, z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import AuthError from 'next-auth';
import { Post } from '@/app/lib/definitions'
const FormSchema = z.object({
    id: z.string(),
    customerId: z.string({
        invalid_type_error: 'Please select a customer.',
    }),
    amount: z.coerce
        .number()
        .gt(0, { message: 'Please enter an amount greater than 0$' }),
    status: z.enum(['pending', 'paid'], { invalid_type_error: 'Please select an invoice status.', }),
    date: z.string(),
})

export type State = {
    errors?: {
        customerId?: string[];
        amount?: string[];
        status?: string[];
    };
    message?: string | null;
};

// id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
// content VARCHAR(9999),
// title VARCHAR(256),
// created_date DATE NOT NULL,
// is_hidden BOOL NOT NULL
export async function CreatePost(formData: FormData) {
    const rawFormData = {
        title: formData.get('title'),
        content: formData.get('content'),
        category: formData.get('category')
    };
    

}

// const CreateInvoice = FormSchema.omit({ id: true, date: true });

// export async function createInvoice(prevState: State, formData: FormData) {
//     const validatedFields = CreateInvoice.safeParse({
//         customerId: formData.get('customerId'),
//         amount: formData.get('amount'),
//         status: formData.get('status'),
//     })

//     if (!validatedFields.success) {
//         return {
//             errors: validatedFields.error.flatten().fieldErrors,
//             message: 'Missing Fields. Failed to create invoice.'
//         }
//     }

//     const { customerId, amount, status } = validatedFields.data;

//     const amountInCents = amount * 100;
//     const date = new Date().toISOString().split('T')[0];
//     console.log(date);

//     try {
//         await sql`
//             INSERT INTO invoices (customer_id, amount, status, date)
//             VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
//         `;
//     } catch (error) {
//         return {
//             message: `Database Error: Failed to create invoice.`,
//         }
//     }

//     revalidatePath('/dashboard/invoices');
//     redirect('/dashboard/invoices');
// }
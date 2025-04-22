"use server";
import { redirect } from "next/navigation";
import { sql } from "@vercel/postgres";
import { QueryConfig, QueryResult } from "@vercel/postgres";
import bcrypt from "bcrypt";
import { LoginFormSchema } from "@/app/lib/definitions";
import { checkString } from "@/app/lib/misc/data";
import { LoginFormState } from "@/app/lib/definitions";
import { createSession } from "@/app/lib/authentication/session";
export default async function handleLogin(
  state: LoginFormState,
  formData: FormData,
) {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  const queryConfig: QueryConfig = {
    text: `SELECT id, email, password, role FROM users WHERE email = $1`,
    values: [email],
  };

  const userRows: QueryResult = await sql.query(queryConfig);
  if (userRows.rowCount == 1) {
    const hashedPassword = checkString(userRows.rows[0]["password"]);
    if (await bcrypt.compare(password, hashedPassword)) {
      const userId: string = checkString(userRows.rows[0]["id"]);
      const userRole: string = checkString(userRows.rows[0]["role"]);
      const userEmail: string = checkString(userRows.rows[0]["email"]);
      await createSession(userId, userRole, userEmail);
      redirect("/posts");
    } else {
      return {
        password: ["Incorrect Password"],
      };
    }
  } else {
    return {
      password: ["This email is not registered"],
    };
  }
}

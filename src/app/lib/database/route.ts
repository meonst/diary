import { db } from "@vercel/postgres";

const client = await db.connect();

async function createPostsTable() {
  await client.sql`CREATE TABLE IF NOT EXISTS posts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    content VARCHAR,
    file_name_one VARCHAR,
    file_name_two VARCHAR,
    file_name_three VARCHAR,
    file_name_four VARCHAR,
    time TIMESTAMP NOT NULL,
    hidden VARCHAR NOT NULL
  )`;
  return;
}

async function createUsersTable() {
  await client.sql`CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    role VARCHAR NOT NULL,
    time TIMESTAMP NOT NULL

  )`;
  return;
}

async function createFilesTable() {
  await client.sql`CREATE TABLE IF NOT EXISTS files (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR NOT NULL,
    time TIMESTAMP NOT NULL
  )`;
  return;
}

async function createUuidExtension() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  return;
}

export async function GET() {
  try {
    await client.sql`BEGIN`;
    await createUuidExtension();
    await createPostsTable();
    await createFilesTable();
    await createUsersTable();
    await client.sql`COMMIT`;

    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    await client.sql`ROLLBACK`;
    console.log("error");
    console.log(error);
    return Response.json({ error }, { status: 500 });
  }
}

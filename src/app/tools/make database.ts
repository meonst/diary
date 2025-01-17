import { db } from '@vercel/postgres';

const client = await db.connect();

async function createPostTable() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`CREATE TABLE IF NOT EXISTS POST (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    content VARCHAR(9999),
    title VARCHAR(256),
    created_date DATE NOT NULL,
    is_hidden BOOL NOT NULL
  )`;
  return ;
}
// add media related column
// add category column

async function createMediaTable() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`CREATE TABLE IF NOT EXISTS MEDIA (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    url VARCHAR(9999),
    title VARCHAR(256),
    created_date DATE NOT NULL,
    is hidden BOOL NOT NULL
)`;
  return ;
}

async function createCategoryTable() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`CREATE CATEGORY IF NOT EXISTS POST (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(256),
    created_date DATE NOT NULL
  )`;
  return ;
}

async function createUserTable() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`
  await client.sql`CREATE TABLE IF NOT EXISTS USER (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email VARCHAR(256),
    password VARCHAR(256),
    created_date DATE NOT NULL
  )`;
  return ;
}

export async function makeDatabase() {
  try {
    await client.sql`BEGIN`;
    await createPostTable();
    await createMediaTable();
    await createCategoryTable();
    
    await client.sql`COMMIT`;

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}

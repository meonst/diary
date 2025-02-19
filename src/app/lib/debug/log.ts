export function log(content: object|string|File, id: string): void
{
    console.log(`start ${id}`);
    console.log(content);
    console.log(`end ${id}`);
}
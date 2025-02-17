export function log(content: any, id: string): void
{
    console.log(`start ${id}`);
    console.log(content);
    console.log(`end ${id}`);
}
export default function checkLog(
  content: object | string | File,
  id: string = "checkLog",
): void {
  console.log(`start ${id}`);
  console.log(content);
  console.log(`end ${id}`);
}

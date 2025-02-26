function zeroPadding(timeNumber: number): string {
  return ("0" + timeNumber).slice(-2);
}

export function currentTime(): string {
  return dateString(new Date());
}

export function dateString(date: Date): string {
  const year: number = date.getFullYear();
  const month: string = zeroPadding(date.getMonth() + 1);
  const day: string = zeroPadding(date.getDate());
  const hours: string = zeroPadding(date.getHours());
  const minutes: string = zeroPadding(date.getMinutes());
  const seconds: string = zeroPadding(date.getSeconds());
  const time: string = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return time;
}

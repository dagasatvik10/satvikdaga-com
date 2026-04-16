import readingTime from 'reading-time';

export function getReadingTime(content: string): string {
  return readingTime(content).text;
}

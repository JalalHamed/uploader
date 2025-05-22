export default function truncateFileName(name: string, maxLength = 24): string {
  if (name.length <= maxLength) return name;
  return `${name.slice(0, maxLength)}...`;
}

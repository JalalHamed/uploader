export default function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes}B`;
  else if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
  else return `${(bytes / (1024 * 1024)).toFixed(2)}MB`;
}

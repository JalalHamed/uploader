export default function getErrorMessage(code: string): string {
  switch (code) {
    case 'file-invalid-type':
      return 'Invalid Type';
    case 'file-too-large':
      return 'File too large';
    case 'network-error':
      return 'Network Error';
    default:
      return '';
  }
}

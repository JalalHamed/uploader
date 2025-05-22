import type { FileRejection, FileWithPath } from 'react-dropzone';

export default function isFileRejection(
  file: FileWithPath | FileRejection
): file is FileRejection {
  return 'errors' in file;
}

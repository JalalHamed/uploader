import { atom, useAtom } from 'jotai';
import type { FileRejection, FileWithPath } from 'react-dropzone';

export type UploadEntry =
  | {
      file: FileWithPath;
      status: 'pending' | 'completed' | 'failed';
      progress: number; // 0 to 100
    }
  | FileRejection;

export const uploadedFilesAtom = atom<UploadEntry[]>([]);
export const useUploadedFilesAtom = () => useAtom(uploadedFilesAtom);

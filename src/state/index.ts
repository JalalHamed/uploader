import { atom, useAtom } from 'jotai';
import type { FileRejection, FileWithPath } from 'react-dropzone';

export type UploadEntry = FileWithPath | FileRejection;
export const uploadedFilesAtom = atom<UploadEntry[]>([]);
export const useUploadedFilesAtom = () => useAtom(uploadedFilesAtom);

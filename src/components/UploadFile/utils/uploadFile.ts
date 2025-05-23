import axiosInstance from 'config/axios';
import type { FileWithPath } from 'react-dropzone';

const controllerMap = new Map<string, AbortController>();

export default async function uploadFile(
  file: FileWithPath,
  onProgress: (progress: number) => void
): Promise<{ message: string }> {
  const controller = new AbortController();
  controllerMap.set(file.name, controller);

  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axiosInstance.post('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      signal: controller.signal,
      onUploadProgress: (event) => {
        if (event.total) {
          const percent = Math.round((event.loaded / event.total) * 100);
          onProgress(percent);
        }
      },
    });

    return response.data;
  } finally {
    controllerMap.delete(file.name);
  }
}

export function cancelUpload(fileName: string) {
  const controller = controllerMap.get(fileName);
  controller?.abort();
  controllerMap.delete(fileName);
}

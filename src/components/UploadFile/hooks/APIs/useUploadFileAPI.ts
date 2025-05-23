import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import axiosInstance from 'config/axios';
import type { FileWithPath } from 'react-dropzone';

type SuccessResponse = { message: string };
type ErrorResponse = { message: string };

const controllerMap = new Map<string, AbortController>();

export default function useUploadFileAPI() {
  const mutation = useMutation<
    SuccessResponse,
    AxiosError<ErrorResponse>,
    { file: FileWithPath; onProgress: (progress: number) => void }
  >({
    mutationFn: async ({ file, onProgress }) => {
      const controller = new AbortController();
      controllerMap.set(file.name, controller);

      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await axiosInstance.post<SuccessResponse>(
          '/upload',
          formData,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
            signal: controller.signal,
            onUploadProgress: (event) => {
              if (event.total) {
                const percent = Math.round((event.loaded / event.total) * 100);
                onProgress(percent);
              }
            },
          }
        );
        return response.data;
      } finally {
        controllerMap.delete(file.name);
      }
    },
  });

  function cancel(fileName: string) {
    const controller = controllerMap.get(fileName);
    controller?.abort();
    controllerMap.delete(fileName);
  }

  return {
    mutate: mutation.mutate,
    cancel,
    isPending: mutation.isPending,
  };
}

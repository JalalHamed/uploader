import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import axiosInstance from 'config/axios';
import type { FileWithPath } from 'react-dropzone';

type Data = FileWithPath;
type SuccessResponse = { message: string };
type ErrorResponse = { message: string };

export default function useUploadFileAPI(): UseMutationResult<
  SuccessResponse,
  AxiosError<ErrorResponse>,
  Data
> {
  return useMutation({
    mutationFn: async (file: Data) => {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axiosInstance.post<SuccessResponse>(
        'upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      return response.data;
    },
  });
}

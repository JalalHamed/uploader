import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import axiosInstance from 'config/axios';

type Data = string;
type SuccessResponse = { message: string };
type ErrorResponse = { message: string };

export default function useDeleteFileAPI(): UseMutationResult<
  SuccessResponse,
  AxiosError<ErrorResponse>,
  Data
> {
  return useMutation({
    mutationFn: async (filename: Data) =>
      (
        await axiosInstance.delete<SuccessResponse>('upload', {
          data: { filename },
        })
      ).data,
  });
}

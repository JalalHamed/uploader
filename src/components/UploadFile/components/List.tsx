import { Box, Stack, Typography } from '@mui/material';
import { useUploadedFilesAtom, type UploadEntry } from 'state';
import {
  BlueStatusIcon,
  CancelIcon,
  CheckIcon,
  CloseIcon,
  GreenStatusIcon,
  RedStatusIcon,
  RetryIcon,
} from '../icons';
import { formatFileSize, getErrorMessage, truncateFileName } from '../utils';
import { useDeleteFileAPI, useUploadFileAPI } from '../hooks';

export default function List() {
  const [uploadedFiles, setUploadedFiles] = useUploadedFilesAtom();
  const { cancel, mutate } = useUploadFileAPI();
  const { mutate: mutateDelete } = useDeleteFileAPI();

  if (!uploadedFiles.length) return null;

  const handleRetry = (fileEntry: UploadEntry) => {
    if (!('file' in fileEntry)) return;
    const file = fileEntry.file;

    setUploadedFiles((prev) =>
      prev.map((f) =>
        'file' in f && f.file.name === file.name
          ? { ...f, status: 'pending', progress: 0, errors: undefined }
          : f
      )
    );

    mutate(
      {
        file,
        onProgress: (progress) => {
          setUploadedFiles((prev) =>
            prev.map((f) =>
              'file' in f && f.file.name === file.name ? { ...f, progress } : f
            )
          );
        },
      },
      {
        onSuccess: () => {
          setUploadedFiles((prev) =>
            prev.map((f) =>
              'file' in f && f.file.name === file.name
                ? { ...f, status: 'completed', progress: 100 }
                : f
            )
          );
        },
        onError: () => {
          setUploadedFiles((prev) =>
            prev.map((f) =>
              'file' in f && f.file.name === file.name
                ? {
                    ...f,
                    status: 'failed',
                    progress: 0,
                    errors: [{ code: 'network-error' }],
                  }
                : f
            )
          );
        },
      }
    );
  };

  return (
    <Stack gap='9px'>
      <Typography fontWeight={500} fontFamily='InterTight'>
        Files
      </Typography>

      {uploadedFiles.map((item, index) => {
        const isRejected = 'errors' in item && !!item.errors?.length;
        const isUploading = 'status' in item && item.status === 'pending';
        const file = 'file' in item ? item.file : null;
        const isFailed = 'status' in item && item.status === 'failed';
        const progress = 'progress' in item ? item.progress : 0;

        return (
          <Box
            key={index}
            position='relative'
            border='1px solid #EDEDED'
            bgcolor='#FAFAFA'
            borderRadius='6px'
            p='6px 10px'
            minHeight='34px'
            display='flex'
            alignItems='center'
            justifyContent='space-between'
            overflow='hidden'
          >
            <Stack gap='4px' direction='row' alignItems='center'>
              {isRejected ? (
                <CloseIcon />
              ) : isUploading ? (
                <Box
                  width='13px'
                  height='14px'
                  display='flex'
                  alignItems='center'
                  justifyContent='center'
                >
                  <Box className='loader' />
                </Box>
              ) : (
                <CheckIcon />
              )}

              <Typography
                fontFamily='InterTight'
                fontSize='14px'
                lineHeight='13.2px'
              >
                {file && truncateFileName(file.name)}
              </Typography>

              <Typography
                fontFamily='InterTight'
                fontSize='14px'
                lineHeight='13.2px'
                color={isRejected ? '#F13C72' : '#9B9B9B'}
              >
                ({file && formatFileSize(file.size)})
              </Typography>
            </Stack>

            <Stack gap='7px' direction='row' alignItems='center'>
              <Stack
                border='0.8px solid #DDD'
                p='4px 10px'
                direction='row'
                alignItems='center'
                gap='4px'
                borderRadius='6px'
              >
                {isRejected ? (
                  <RedStatusIcon />
                ) : isUploading ? (
                  <BlueStatusIcon />
                ) : (
                  <GreenStatusIcon />
                )}

                <Typography
                  fontFamily='InterTight'
                  fontSize='14px'
                  lineHeight='13.2px'
                >
                  {isRejected
                    ? `Failed — ${getErrorMessage(
                        item.errors?.[0]?.code ?? ''
                      )}`
                    : isUploading
                    ? 'Uploading'
                    : 'Completed'}
                </Typography>
              </Stack>

              <Stack
                border='0.8px solid #DDD'
                borderRadius='8px'
                sx={{ cursor: 'pointer' }}
                onClick={() => {
                  if (isUploading && file) {
                    cancel(file.name);
                    setUploadedFiles((prev) =>
                      prev.filter((_, i) => i !== index)
                    );
                  } else if (!isRejected && file) {
                    mutateDelete(file.name);
                    setUploadedFiles((prev) =>
                      prev.filter((_, i) => i !== index)
                    );
                  } else if (isFailed) {
                    handleRetry(item);
                  } else if (isRejected) {
                    setUploadedFiles((prev) =>
                      prev.filter((_, i) => i !== index)
                    );
                  }
                }}
              >
                {isRejected && item.errors?.[0]?.code === 'network-error' ? (
                  <RetryIcon />
                ) : (
                  <CancelIcon />
                )}
              </Stack>
            </Stack>

            {/* Progress bar at the bottom */}
            {isUploading && (
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  height: '4px',
                  width: '100%',
                  backgroundColor: '#E0E0E0',
                }}
              >
                <Box
                  sx={{
                    height: '100%',
                    width: `${progress}%`,
                    backgroundColor: '#3ca5f1',
                    transition: 'width 0.3s ease',
                  }}
                />
              </Box>
            )}
          </Box>
        );
      })}
    </Stack>
  );
}

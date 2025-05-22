import { Stack, Typography } from '@mui/material';
import { useUploadedFilesAtom } from 'state';
import {
  CancelIcon,
  CheckIcon,
  CloseIcon,
  GreenStatusIcon,
  RedStatusIcon,
  RetryIcon,
} from '../icons';
import {
  deleteFile,
  formatFileSize,
  getErrorMessage,
  isFileRejection,
  truncateFileName,
} from '../utils';

export default function List() {
  const [uploadedFiles, setUploadedFiles] = useUploadedFilesAtom();

  console.log({ uploadedFiles });

  if (!uploadedFiles.length) return null;
  return (
    <Stack gap='9px'>
      <Typography fontWeight={500} fontFamily='InterTight'>
        Files
      </Typography>

      {uploadedFiles.map((item, index) => {
        console.log(item);
        const isRejected = isFileRejection(item);
        const file = isRejected ? item.file : item;

        return (
          <Stack
            key={index}
            border='1px solid #EDEDED'
            bgcolor='#FAFAFA'
            borderRadius='6px'
            p='6px 10px'
            direction='row'
            alignItems='center'
            justifyContent='space-between'
          >
            <Stack gap='4px' direction='row' alignItems='center'>
              {isRejected ? <CloseIcon /> : <CheckIcon />}
              <Typography
                fontFamily='InterTight'
                fontSize='14px'
                lineHeight='13.2px'
              >
                {truncateFileName(file.name)}
              </Typography>
              <Typography
                fontFamily='InterTight'
                fontSize='14px'
                lineHeight='13.2px'
                color={isRejected ? '#F13C72' : '#9B9B9B'}
              >
                ({formatFileSize(file.size)})
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
                {isRejected ? <RedStatusIcon /> : <GreenStatusIcon />}
                <Typography
                  fontFamily='InterTight'
                  fontSize='14px'
                  lineHeight='13.2px'
                >
                  {isRejected
                    ? `Failed — ${getErrorMessage(item.errors[0].code)}`
                    : 'Completed'}
                </Typography>
              </Stack>

              <Stack
                border='0.8px solid #DDD'
                borderRadius='8px'
                sx={{ cursor: 'pointer' }}
                onClick={() => {
                  if (!isRejected) {
                    deleteFile(file.name);
                    setUploadedFiles((prev) =>
                      prev.filter((_, i) => i !== index)
                    );
                  }
                }}
              >
                {isRejected ? <RetryIcon /> : <CancelIcon />}
              </Stack>
            </Stack>
          </Stack>
        );
      })}
    </Stack>
  );
}

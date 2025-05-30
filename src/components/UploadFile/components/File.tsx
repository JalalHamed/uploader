import { Button, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useUploadedFilesAtom } from 'state';
import { DESCRIPTION_STYLES, RULES_STYLES } from '../constants';
import { BoxIcon } from '../icons';
import { uploadFile } from '../utils';

export default function File() {
  const [, setUploadedFiles] = useUploadedFilesAtom();
  const { getRootProps, getInputProps, acceptedFiles, fileRejections, open } =
    useDropzone({
      accept: { 'image/jpeg': [], 'image/png': [] },
      maxSize: 2 * 1024 * 1024,
      noClick: true,
      noKeyboard: true,
    });

  useEffect(() => {
    if (!acceptedFiles.length) return;

    acceptedFiles.forEach(async (file) => {
      setUploadedFiles((prev) => [
        ...prev,
        { file, status: 'pending', progress: 0 },
      ]);

      try {
        await uploadFile(file, (progress) => {
          setUploadedFiles((prev) =>
            prev.map((f) =>
              'file' in f && f.file.name === file.name ? { ...f, progress } : f
            )
          );
        });

        setUploadedFiles((prev) =>
          prev.map((f) =>
            'file' in f && f.file.name === file.name
              ? { ...f, status: 'completed', progress: 100 }
              : f
          )
        );
      } catch {
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
      }
    });
  }, [acceptedFiles, setUploadedFiles]);

  useEffect(() => {
    if (!fileRejections.length) return;
    setUploadedFiles((prev) => [...prev, ...fileRejections]);
  }, [fileRejections, setUploadedFiles]);

  return (
    <Stack gap='8px' {...getRootProps()}>
      <Typography fontWeight={500} fontFamily='InterTight'>
        File
      </Typography>

      <Stack
        border='1px dashed #B6B6B6'
        borderRadius='10px'
        p='21px 10px 10px'
        gap='11px'
        height='267px'
        alignItems='center'
        justifyContent='center'
        sx={{
          background:
            'repeating-linear-gradient(60deg, #f7f7f7 0px, #f7f7f7 36px, #fbfbfb 36px, #fbfbfb 72px)',
        }}
      >
        <input {...getInputProps()} style={{ display: 'none' }} />
        <BoxIcon />
        <Typography
          sx={{ ...DESCRIPTION_STYLES, color: '#8E949D', textAlign: 'center' }}
        >
          Drag & drop a{' '}
          <Typography component='span' sx={DESCRIPTION_STYLES}>
            file
          </Typography>
          <br /> or{' '}
          <Typography component='span' sx={DESCRIPTION_STYLES}>
            browse
          </Typography>{' '}
          to upload
        </Typography>

        <Button
          variant='contained'
          sx={{
            height: '40px',
            width: '106px',
            p: '10px',
            borderRadius: '8px',
            background: 'linear-gradient(180deg, #41404C 0%, #333336 100%)',
            boxShadow: '0px 4px 11px 0px #00000017',
          }}
          onClick={(e) => {
            e.stopPropagation();
            open();
          }}
        >
          <Typography
            fontWeight={500}
            fontFamily='InterTight'
            textTransform='none'
          >
            Browse
          </Typography>
        </Button>

        <Stack gap='6px' alignItems='center'>
          <Typography sx={{ ...RULES_STYLES, color: '#8E949D' }}>
            File must be{' '}
            <Typography component='span' sx={RULES_STYLES}>
              .JPG
            </Typography>{' '}
            or
            <Typography component='span' sx={RULES_STYLES}>
              .PNG
            </Typography>
          </Typography>
          <Typography sx={RULES_STYLES}>Max → 2MB</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}

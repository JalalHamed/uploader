import { Stack } from '@mui/material';
import { File, Hero, List } from './components';

export default function UploadFile() {
  return (
    <Stack
      gap='29px'
      pt='124px'
      bgcolor='#FAFAFA'
      minHeight='100%'
      alignItems='center'
    >
      <Hero />

      <Stack
        border='1px solid #EEEEEE'
        borderRadius='10px'
        gap='28px'
        p='20px 32px'
        bgcolor='#FFF'
        width='600px'
      >
        <File />
        <List />
      </Stack>
    </Stack>
  );
}

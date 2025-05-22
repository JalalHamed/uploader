import { Stack, Typography } from '@mui/material';
import LogoImage from 'images/logo.png';
import { TEXT_STYLES } from '../constants';

export default function Hero() {
  return (
    <Stack gap='12px' alignItems='center'>
      <img src={LogoImage} alt='Logo' width='51px' height='51px' />
      <Typography sx={{ ...TEXT_STYLES }}>
        Upload Your{' '}
        <Typography component='span' sx={{ ...TEXT_STYLES, color: '#8E949D' }}>
          Files
        </Typography>
      </Typography>
    </Stack>
  );
}

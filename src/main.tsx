import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { UploadFile } from 'components';
import 'global.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

const theme = createTheme({ typography: { fontFamily: 'Manrope' } });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UploadFile />
    </ThemeProvider>
  </StrictMode>
);

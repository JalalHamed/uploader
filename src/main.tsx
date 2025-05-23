import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UploadFile } from 'components';
import 'global.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

const theme = createTheme({ typography: { fontFamily: 'Manrope' } });

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <UploadFile />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);

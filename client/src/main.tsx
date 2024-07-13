import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createTheme, ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import router from './routing/router.tsx';

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
});

const client = new QueryClient();

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryClientProvider client={client}>
			<ThemeProvider theme={darkTheme}>
				<CssBaseline />
				<RouterProvider router={router} />
			</ThemeProvider>
		</QueryClientProvider>
	</StrictMode>
);

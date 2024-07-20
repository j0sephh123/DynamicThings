import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import router from './routing/router.tsx';
import DarkThemeProvider from './theming/DarkThemeProvider.tsx';
import ReactQueryProvider from './api/ReactQueryProvider.tsx';
import AppContextProvider from './context/AppContext/AppContextProvider.tsx';
import LocalStorageContextProvider from './context/LocalStorageContextProvider.tsx';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<ReactQueryProvider>
				<DarkThemeProvider>
					<LocalStorageContextProvider>
						<AppContextProvider>
							<RouterProvider router={router} />
						</AppContextProvider>
					</LocalStorageContextProvider>
				</DarkThemeProvider>
			</ReactQueryProvider>
		</LocalizationProvider>
	</StrictMode>
);

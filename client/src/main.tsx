import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './routing/router.tsx';
import DarkThemeProvider from './theming/DarkThemeProvider.tsx';
import ReactQueryProvider from './api/ReactQueryProvider.tsx';
import AppContextProvider from './context/AppContextProvider.tsx';
import LocalStorageContextProvider from './context/LocalStorageContextProvider.tsx';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ReactQueryProvider>
			<DarkThemeProvider>
				<LocalStorageContextProvider>
					<AppContextProvider>
						<RouterProvider router={router} />
					</AppContextProvider>
				</LocalStorageContextProvider>
			</DarkThemeProvider>
		</ReactQueryProvider>
	</StrictMode>
);

import { PropsWithChildren } from 'react';
import '../index.css';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
});

export default function DarkThemeProvider({ children }: PropsWithChildren) {
	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	);
}

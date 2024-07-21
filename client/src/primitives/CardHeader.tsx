import { Box } from '@mui/material';
import { PropsWithChildren } from 'react';

export default function CardHeader({ children }: PropsWithChildren) {
	return (
		<Box
			sx={theme => ({
				// TODO extract as a generic wrapper
				ml: theme.spacing(1),
				mt: theme.spacing(3),
				p: theme.spacing(2),
				border: `1px solid ${theme.palette.grey[700]}`,
				borderTopLeftRadius: theme.shape.borderRadius,
				borderTopRightRadius: theme.shape.borderRadius,
			})}
		>
			{children}
		</Box>
	);
}

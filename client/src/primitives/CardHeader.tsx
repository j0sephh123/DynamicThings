import { Box } from '@mui/material';
import { PropsWithChildren } from 'react';

export default function CardHeader({ children }: PropsWithChildren) {
	return (
		<Box
			sx={theme => ({
				// TODO extract as a generic wrapper
				mt: theme.spacing(2),
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

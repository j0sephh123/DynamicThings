import { Box, Grid, Stack, Typography } from '@mui/material';
import { PropsWithChildren } from 'react';
import CardHeader from '../../../primitives/CardHeader';

const CardContent = ({ children }: PropsWithChildren) => {
	return (
		<Box
			sx={theme => ({
				// TODO extract as a generic wrapper
				ml: theme.spacing(1),
				p: theme.spacing(2),
				border: `1px solid ${theme.palette.grey[700]}`,
				borderTop: 'none',
				borderBottomLeftRadius: theme.shape.borderRadius,
				borderBottomRightRadius: theme.shape.borderRadius,
			})}
		>
			{children}
		</Box>
	);
};

export default function EmployeeDetails() {
	return (
		<Grid container spacing={1}>
			<Grid xs={4}>
				<CardHeader>Profile Picture</CardHeader>
				<CardContent>
					<Box
						sx={{
							height: '100px',
							width: '100px',
							borderRadius: '50%',
						}}
						src="/cat.jpg"
						component="img"
					/>
					<Typography variant="body2">
						Upload/Change Your Profile Image
					</Typography>
				</CardContent>
			</Grid>
			<Grid xs={8}>
				<CardHeader>Edit Account Details</CardHeader>
				<CardContent>1</CardContent>
			</Grid>
		</Grid>
	);
}
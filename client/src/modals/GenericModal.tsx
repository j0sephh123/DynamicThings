import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Stack, Typography } from '@mui/material';

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
} as const;

type Props = {
	triggerLabel: string;
	onSubmit: () => void;
} & React.PropsWithChildren;

export default function GenericModal({
	triggerLabel,
	onSubmit,
	children,
}: Props) {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<>
			<Button onClick={handleOpen}>{triggerLabel}</Button>
			<Modal open={open} onClose={handleClose}>
				<Box sx={style}>
					<Stack spacing={3}>
						<Typography variant="h6" component="h2">
							{triggerLabel}
						</Typography>
						{children}
						<Button onClick={onSubmit} variant="contained">
							{triggerLabel}
						</Button>
					</Stack>
				</Box>
			</Modal>
		</>
	);
}

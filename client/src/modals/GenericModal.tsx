import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Stack, Typography } from '@mui/material';
import { useAppContext } from '../context/AppContext/AppContext';

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
	label: string;
	onSubmit?: () => void;
} & React.PropsWithChildren;

export default function GenericModal({ label, onSubmit, children }: Props) {
	const { closeModal } = useAppContext();

	return (
		<Modal open onClose={closeModal}>
			<Box sx={style}>
				<Stack spacing={3}>
					<Typography variant="h6" component="h2">
						{label}
					</Typography>
					{children}
					{typeof onSubmit === 'function' && (
						<Button onClick={onSubmit} variant="contained">
							{label}
						</Button>
					)}
				</Stack>
			</Box>
		</Modal>
	);
}

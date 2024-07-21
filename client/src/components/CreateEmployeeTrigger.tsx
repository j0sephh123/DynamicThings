import { Add } from '@mui/icons-material';
import { Box, Fab } from '@mui/material';
import { useAppContext } from '../context/AppContext/AppContext';

export default function CreateEmployeeTrigger() {
	const { openModal } = useAppContext();

	return (
		<Box
			sx={{
				position: 'fixed',
				bottom: 72,
				right: 12,
			}}
		>
			<Fab
				onClick={() =>
					openModal({
						type: 'createEmployee',
					})
				}
				color="primary"
			>
				<Add />
			</Fab>
		</Box>
	);
}

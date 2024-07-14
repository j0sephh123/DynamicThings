import { Add } from '@mui/icons-material';
import { Box, Fab } from '@mui/material';
import { useAppContext } from '../context/AppContextProvider';

export default function CreateEmployeeTrigger() {
	const { openModal } = useAppContext();

	return (
		<Box
			sx={{
				position: 'fixed',
				bottom: 16,
				right: 16,
			}}
		>
			<Fab onClick={() => openModal('createEmployee')} color="primary">
				<Add />
			</Fab>
		</Box>
	);
}

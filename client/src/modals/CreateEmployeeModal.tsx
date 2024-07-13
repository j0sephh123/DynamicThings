import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useCreateEmployee } from '../api/queries';

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
};

export default function CreateEmployeeModal() {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const createEmployeeMutation = useCreateEmployee();

	const handleCreateEmployee = () => {
		createEmployeeMutation({
			department: 'Finance',
			experience: 1,
			name: 'John Doe',
			position: 'DevOps Engineer',
		});
	};

	return (
		<div>
			<Button onClick={handleOpen}>Open modal</Button>
			<Modal open={open} onClose={handleClose}>
				<Box sx={style}>
					<Typography variant="h6" component="h2">
						Create an employee
					</Typography>

					<Button onClick={handleCreateEmployee} variant="contained">
						Create Employee
					</Button>
				</Box>
			</Modal>
		</div>
	);
}

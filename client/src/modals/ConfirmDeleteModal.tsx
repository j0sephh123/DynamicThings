import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useAppContext } from '../context/AppContext/AppContext';

export default function ConfirmDeleteModal() {
	const { closeModal } = useAppContext();

	const handleDelete = () => {
		console.log('delete');
	};

	return (
		<>
			<Dialog
				open
				onClose={closeModal}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">Confirm Delete</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Are you sure you want to delete this employee
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={closeModal}>Disagree</Button>
					<Button onClick={handleDelete} autoFocus>
						Agree
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {
	ConfirmDeleteModalType,
	useModalContext,
} from '../context/ModalContext/ModalContext';
import { useDeleteEmployee } from '../api/queries';
import useQueryClientActions from '../api/useQueryClientActions';

type Props = Omit<ConfirmDeleteModalType, 'type'>;

export default function ConfirmDeleteModal({ id }: Props) {
	const { invalidateEmployees } = useQueryClientActions();
	const { closeModal } = useModalContext();
	const deleteEmployeeMutation = useDeleteEmployee(id);

	const handleDelete = () => {
		deleteEmployeeMutation().then(() => {
			invalidateEmployees();
			closeModal();
		});
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

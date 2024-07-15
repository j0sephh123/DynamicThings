import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {
	ConfirmDeleteModalType,
	useAppContext,
} from '../context/AppContext/AppContext';
import { useDeleteEmployee } from '../api/queries';
import { useQueryClient } from '@tanstack/react-query';
import { getEmployeesQueryKey } from '../api/queryKeys';

type Props = Omit<ConfirmDeleteModalType, 'type'>;

export default function ConfirmDeleteModal({ id }: Props) {
	const queryClient = useQueryClient();
	const { closeModal } = useAppContext();
	const deleteEmployeeMutation = useDeleteEmployee(id);

	const handleDelete = () => {
		deleteEmployeeMutation().then(() => {
			queryClient.invalidateQueries({
				queryKey: getEmployeesQueryKey(),
			});
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

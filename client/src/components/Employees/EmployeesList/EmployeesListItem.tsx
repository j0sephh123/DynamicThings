import {
	ListItem,
	ListItemText,
	Typography,
	ListItemSecondaryAction,
} from '@mui/material';
import DeleteIcon from '../../../icons/DeleteIcon';
import EditIcon from '../../../icons/EditIcon';
import { EmployeesItemProps } from '../types';
import { Link } from 'react-router-dom';

export default function EmployeesListItem({
	employee,
	onEmployeeDelete,
	onEmployeeEdit,
}: EmployeesItemProps) {
	return (
		<ListItem divider>
			<ListItemText
				primary={
					<Link to={`/employees/${employee.id}`}>
						<Typography variant="body1">{employee.name}</Typography>
					</Link>
				}
				secondary={
					<>
						<Typography component="span" variant="body2" color="textPrimary">
							{employee.position} - {employee.department}
						</Typography>
						<Typography component="span" variant="body2" color="textSecondary">
							({employee.experience})
						</Typography>
					</>
				}
			/>
			<ListItemSecondaryAction>
				<EditIcon onClick={onEmployeeEdit} />
				<DeleteIcon onClick={onEmployeeDelete} />
			</ListItemSecondaryAction>
		</ListItem>
	);
}

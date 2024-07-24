import { TableRow, TableCell } from '@mui/material';
import EditIcon from '../../../icons/EditIcon';
import DeleteIcon from '../../../icons/DeleteIcon';
import { EmployeesItemProps } from '../types';
import MuiAppLink from '../../../plugins/mui/MuiAppLink';

export default function EmployeesTableRow({
	employee,
	onEmployeeDelete,
	onEmployeeEdit,
}: EmployeesItemProps) {
	return (
		<TableRow
			key={employee.id}
			sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
		>
			<TableCell>{employee.id}</TableCell>
			<TableCell>
				<MuiAppLink to={`/employees/${employee.id}`}>
					{employee.name}
				</MuiAppLink>
			</TableCell>
			<TableCell>{employee.position}</TableCell>
			<TableCell>{employee.department}</TableCell>
			<TableCell>{employee.experience}</TableCell>
			<TableCell align="right">
				<EditIcon onClick={onEmployeeEdit} />
				<DeleteIcon onClick={onEmployeeDelete} />
			</TableCell>
		</TableRow>
	);
}

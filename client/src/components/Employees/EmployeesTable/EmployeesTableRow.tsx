import { TableRow, TableCell } from '@mui/material';
import EditIcon from '../../../icons/EditIcon';
import DeleteIcon from '../../../icons/DeleteIcon';
import { EmployeesItemProps } from '../types';
import AppLink from '../../../components/AppLink';

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
				<AppLink to={`/employees/${employee.id}`}>{employee.name}</AppLink>
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

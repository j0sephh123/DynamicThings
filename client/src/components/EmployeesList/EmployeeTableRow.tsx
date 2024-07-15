import { Delete } from '@mui/icons-material';
import { TableRow, TableCell, IconButton } from '@mui/material';
import { Employee } from '@server/sharedTypes';

type Props = {
	employee: Employee;
	onEmployeeDelete: (id: Employee['id']) => void;
};

export default function EmployeeTableRow({
	employee,
	onEmployeeDelete,
}: Props) {
	return (
		<TableRow
			key={employee.id}
			sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
		>
			<TableCell>{employee.id}</TableCell>
			<TableCell>{employee.name}</TableCell>
			<TableCell>{employee.position}</TableCell>
			<TableCell>{employee.department}</TableCell>
			<TableCell>{employee.experience}</TableCell>
			<TableCell align="right">
				<IconButton onClick={() => onEmployeeDelete(employee.id)}>
					<Delete color="error" />
				</IconButton>
			</TableCell>
		</TableRow>
	);
}

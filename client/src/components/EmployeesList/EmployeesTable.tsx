import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useLocalStorageContext } from '../../context/LocalStorageContextProvider';
import { useAppContext } from '../../context/AppContext/AppContext';
import { useCallback } from 'react';
import { Employee } from '@server/sharedTypes';
import EmployeeTableRow from './EmployeeTableRow';
import { EmployeesListProps } from './types';

export default function EmployeesTable({ employees }: EmployeesListProps) {
	const { openModal } = useAppContext();
	const { settings } = useLocalStorageContext();

	const handleRequestDelete = useCallback((id: Employee['id']) => {
		openModal({
			type: 'confirmDelete',
			id,
		});
	}, []);

	const handleRequestEdit = useCallback((employee: Employee) => {
		openModal({
			type: 'editEmployee',
			employee,
		});
	}, []);

	return (
		<TableContainer component={Paper}>
			<Table
				size={settings.employeesTableSize}
				sx={{ minWidth: 650 }}
				aria-label="employee table"
			>
				<TableHead>
					<TableRow>
						<TableCell>ID</TableCell>
						<TableCell>Name</TableCell>
						<TableCell>Position</TableCell>
						<TableCell>Department</TableCell>
						<TableCell>Experience</TableCell>
						<TableCell align="right">Actions</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{employees?.map(employee => (
						<EmployeeTableRow
							key={employee.id}
							employee={employee}
							onEmployeeDelete={() => handleRequestDelete(employee.id)}
							onEmployeeEdit={() => handleRequestEdit(employee)}
						/>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

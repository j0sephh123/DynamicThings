import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useGetEmployees } from './api/queries';
import { useLocalStorageContext } from './context/LocalStorageContextProvider';

export default function EmployeesTable() {
	const { settings } = useLocalStorageContext();
	const employees = useGetEmployees();

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
						<TableCell align="right">Experience (Years)</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{employees?.map(employee => (
						<TableRow
							key={employee.id}
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
						>
							<TableCell>{employee.id}</TableCell>
							<TableCell>{employee.name}</TableCell>
							<TableCell>{employee.position}</TableCell>
							<TableCell>{employee.department}</TableCell>
							<TableCell align="right">{employee.experience}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useGetEmployees } from '../../api/queries';
import { useLocalStorageContext } from '../../context/LocalStorageContextProvider';
import { IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useAppContext } from '../../context/AppContext/AppContext';

export default function EmployeesTable() {
	const { openModal } = useAppContext();
	const { settings } = useLocalStorageContext();
	const employees = useGetEmployees();

	const handleRequstDelete = () => {
		// open confirm delete modal
		// and set metadata
	};

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
								<IconButton onClick={handleRequstDelete}>
									<Delete color="error" />
								</IconButton>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

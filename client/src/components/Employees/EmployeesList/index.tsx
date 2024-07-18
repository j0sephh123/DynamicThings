import { List } from '@mui/material';
import { EmployeesListProps } from '../types';
import EmployeesListItem from './EmployeesListItem';
import useEmployeesCommon from '../useEmployeesCommon';

export default function EmployeesList({ employees }: EmployeesListProps) {
	const { handleRequestDelete, handleRequestEdit } = useEmployeesCommon();

	return (
		<List>
			{employees.map(employee => (
				<EmployeesListItem
					key={employee.id}
					employee={employee}
					onEmployeeDelete={() => handleRequestDelete(employee.id)}
					onEmployeeEdit={() => handleRequestEdit(employee)}
				/>
			))}
		</List>
	);
}

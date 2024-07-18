import { useGetEmployees } from '../../api/queries';
import EmployeesListUi from './EmployeesListUi';
import EmployeesTable from './EmployeesTable';

export default function EmployeesList() {
	const employees = useGetEmployees();

	if (!employees) {
		return;
	}

	return (
		<>
			<EmployeesListUi />
			<EmployeesTable employees={employees} />
		</>
	);
}

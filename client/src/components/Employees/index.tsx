import { useLocalStorageContext } from '../../context/LocalStorageContextProvider';
import { useGetEmployees } from '../../api/queries';
import EmployeesList from './EmployeesList';
import EmployeesTable from './EmployeesTable';

const components = {
	list: EmployeesList,
	table: EmployeesTable,
};

export default function Employees() {
	const { settings } = useLocalStorageContext();
	const employees = useGetEmployees();

	console.log(employees);

	if (!employees) {
		return;
	}

	const Component = components[settings.employeesLayout];

	return (
		<>
			<Component employees={employees} />
		</>
	);
}

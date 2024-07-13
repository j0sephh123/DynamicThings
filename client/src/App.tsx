import EmployeesTable from './EmployeesTable';
import Navbar from './layout/Navbar';
import CreateEmployeeModal from './modals/CreateEmployeeModal';

export default function App() {
	return (
		<>
			<Navbar />
			<EmployeesTable />
			<CreateEmployeeModal />
		</>
	);
}

import EmployeesTable from './EmployeesTable';
import Navbar from './layout/Navbar';
import CreateEmployeeModal from './modals/CreateEmployeeModal';

function App() {
	return (
		<>
			<Navbar />
			<EmployeesTable />
			<CreateEmployeeModal />
		</>
	);
}

export default App;

import { useAppContext } from './context/AppContextProvider';
import EmployeesTable from './EmployeesTable';
import CreateEmployeeForm from './form/CreateEmployeeForm';
import Navbar from './layout/Navbar';
import CreateEmployeeTrigger from './components/CreateEmployeeTrigger';
import SettingsForm from './form/SettingsForm';

export default function App() {
	const { currentModal } = useAppContext();

	return (
		<>
			<Navbar />
			<EmployeesTable />
			<CreateEmployeeTrigger />
			{currentModal === 'createEmployee' && <CreateEmployeeForm />}
			{currentModal === 'settings' && <SettingsForm />}
		</>
	);
}

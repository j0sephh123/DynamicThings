import { useAppContext } from './context/AppContext/AppContext';
import EmployeesTable from './components/EmployeesList/EmployeesTable';
import CreateEmployeeForm from './form/CreateEmployeeForm';
import Navbar from './layout/Navbar';
import CreateEmployeeTrigger from './components/CreateEmployeeTrigger';
import SettingsForm from './form/SettingsForm';
import ConfirmDeleteModal from './modals/ConfirmDeleteModal';

export default function App() {
	const { currentModal } = useAppContext();

	return (
		<>
			<Navbar />
			<EmployeesTable />
			<CreateEmployeeTrigger />
			{currentModal?.type === 'createEmployee' && <CreateEmployeeForm />}
			{currentModal?.type === 'settings' && <SettingsForm />}
			{currentModal?.type === 'confirmDelete' && <ConfirmDeleteModal />}
		</>
	);
}

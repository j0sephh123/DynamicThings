import { useAppContext } from './context/AppContext/AppContext';
import EmployeesTable from './components/EmployeesList/EmployeesTable';
import EmployeeForm from './form/EmployeeForm';
import Navbar from './layout/Navbar';
import CreateEmployeeTrigger from './components/CreateEmployeeTrigger';
import SettingsForm from './form/SettingsForm';
import ConfirmDeleteModal from './modals/ConfirmDeleteModal';

export default function App() {
	const { currentModal } = useAppContext();

	console.log('currentModal', currentModal);
	

	return (
		<>
			<Navbar />
			<EmployeesTable />
			<CreateEmployeeTrigger />
			{(currentModal?.type === 'createEmployee' ||
				currentModal?.type === 'editEmployee') && (
				<EmployeeForm type={currentModal.type} />
			)}
			{currentModal?.type === 'settings' && <SettingsForm />}
			{currentModal?.type === 'confirmDelete' && (
				<ConfirmDeleteModal id={currentModal.id} />
			)}
		</>
	);
}

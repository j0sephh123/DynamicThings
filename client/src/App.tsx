import { useAppContext } from './context/AppContext/AppContext';
import EmployeeForm from './form/EmployeeForm';
import Navbar from './layout/Navbar';
import CreateEmployeeTrigger from './components/CreateEmployeeTrigger';
import SettingsForm from './form/SettingsForm';
import ConfirmDeleteModal from './modals/ConfirmDeleteModal';
import Employees from './components/Employees';
import ActivityFeed from './components/ActivityFeed';

export default function App() {
	const { currentModal } = useAppContext();

	console.log('currentModal', currentModal);

	return (
		<>
			<Navbar />
			<Employees />
			<ActivityFeed />
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

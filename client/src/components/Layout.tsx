import { Outlet, useNavigation } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import Loading from './Loading';
import { useAppContext } from '../context/AppContext/AppContext';
import EmployeeForm from '../form/SaveEmployeeModal';
import SettingsForm from '../form/SettingsForm';
import ConfirmDeleteModal from '../modals/ConfirmDeleteModal';
import CreateEmployeeTrigger from './CreateEmployeeTrigger';

export default function Layout() {
	const navigation = useNavigation();
	const { currentModal } = useAppContext();

	if (navigation.state === 'loading') {
		return <Loading />;
	}

	return (
		<>
			<Navbar />
			<Outlet />
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

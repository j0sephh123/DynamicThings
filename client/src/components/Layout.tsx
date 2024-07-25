import { Outlet, useNavigation } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import { useModalContext } from '../context/ModalContext/ModalContext';
import EmployeeForm from '../form/SaveEmployeeModal';
import SettingsForm from '../form/SettingsForm';
import ConfirmDeleteModal from '../modals/ConfirmDeleteModal';
import CreateEmployeeTrigger from '../plugins/mui/CreateEmployeeTrigger';

export default function Layout() {
	const navigation = useNavigation();
	const { currentModal } = useModalContext();

	if (navigation.state === 'loading') {
		return <span>loading</span>;
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

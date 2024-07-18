import { List } from '@mui/material';
import GenericModal from '../../modals/GenericModal';
import EmployeesTableSettings from './EmployeesSettings';

export default function SettingsForm() {
	return (
		<GenericModal label="Settings">
			<List sx={{ width: '100%', maxWidth: 360 }}>
				<EmployeesTableSettings />
			</List>
		</GenericModal>
	);
}

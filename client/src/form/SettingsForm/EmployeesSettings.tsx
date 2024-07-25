import {
	employeesLayoutOptions,
	employeesTableSizeOptions,
} from '../../context/constants';
import {
	useLocalStorageContext,
	Settings,
} from '../../context/LocalStorageContextProvider';
import SettingsButtonToggle from './SettingsButtonToggle';
import SettingsPluginToggle from './SettingsPluginToggle';

export default function EmployeesSettings() {
	const { settings, setEmployeesTableSize, setEmployeesEmployeesLayout } =
		useLocalStorageContext();

	const handleEmployeesTableSizeChange = (e: React.MouseEvent<HTMLElement>) => {
		setEmployeesTableSize(
			e.currentTarget.getAttribute('value') as Settings['employeesTableSize']
		);
	};

	const handleEmployeesLayoutChange = (e: React.MouseEvent<HTMLElement>) => {
		setEmployeesEmployeesLayout(
			e.currentTarget.getAttribute('value') as Settings['employeesLayout']
		);
	};

	return (
		<>
			<SettingsPluginToggle />
			<SettingsButtonToggle
				label="Employees layout"
				options={employeesLayoutOptions}
				value={settings?.employeesLayout ?? 'list'}
				onChange={handleEmployeesLayoutChange}
			/>
			{settings.employeesLayout === 'table' && (
				<SettingsButtonToggle
					label="Table rows size"
					options={employeesTableSizeOptions}
					value={settings?.employeesTableSize ?? 'small'}
					onChange={handleEmployeesTableSizeChange}
				/>
			)}
		</>
	);
}

import {
	ToggleButtonGroup,
	ToggleButton,
	ListItem,
	ListItemText,
} from '@mui/material';
import {
	useLocalStorageContext,
	Settings,
	employeesTableSizeOptions,
	employeesLayoutOptions,
} from '../../context/LocalStorageContextProvider';

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
			<ListItem>
				<ListItemText id="switch-list-label-wifi" primary="Employees Layout" />
				<ToggleButtonGroup
					color="primary"
					value={settings?.employeesLayout ?? 'table'}
					exclusive
					onChange={handleEmployeesLayoutChange}
				>
					{employeesLayoutOptions.map(layoutOption => (
						<ToggleButton key={layoutOption} value={layoutOption}>
							{layoutOption}
						</ToggleButton>
					))}
				</ToggleButtonGroup>
			</ListItem>
			{settings.employeesLayout === 'table' && (
				<ListItem>
					<ListItemText id="switch-list-label-wifi" primary="Table rows size" />
					<ToggleButtonGroup
						color="primary"
						value={settings?.employeesTableSize ?? 'small	'}
						exclusive
						onChange={handleEmployeesTableSizeChange}
					>
						{employeesTableSizeOptions.map(tableRowsSize => (
							<ToggleButton key={tableRowsSize} value={tableRowsSize}>
								{tableRowsSize}
							</ToggleButton>
						))}
					</ToggleButtonGroup>
				</ListItem>
			)}
		</>
	);
}

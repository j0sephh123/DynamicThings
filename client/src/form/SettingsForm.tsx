import {
	List,
	ListItem,
	ListItemText,
	ToggleButton,
	ToggleButtonGroup,
} from '@mui/material';
import {
	employeesTableSizeOptions,
	Settings,
	useLocalStorageContext,
} from '../context/LocalStorageContextProvider';
import GenericModal from '../modals/GenericModal';

export default function SettingsForm() {
	const { settings, setEmployeesTableSize } = useLocalStorageContext();

	console.log(settings);

	const handleChange = (e: React.MouseEvent<HTMLElement>) => {
		const value = e.currentTarget.getAttribute(
			'value'
		) as Settings['employeesTableSize'];

		setEmployeesTableSize(value);
	};

	return (
		<GenericModal label="Settings">
			<List sx={{ width: '100%', maxWidth: 360 }}>
				<ListItem>
					<ListItemText id="switch-list-label-wifi" primary="Table rows size" />

					<ToggleButtonGroup
						color="primary"
						value={settings?.employeesTableSize ?? 'small	'}
						exclusive
						onChange={handleChange}
						aria-label="Platform"
					>
						{employeesTableSizeOptions.map(size => (
							<ToggleButton key={size} value={size}>
								{size}
							</ToggleButton>
						))}
					</ToggleButtonGroup>
				</ListItem>
			</List>
		</GenericModal>
	);
}

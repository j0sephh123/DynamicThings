import {
	ListItem,
	ListItemText,
	ToggleButtonGroup,
	ToggleButton,
} from '@mui/material';

type Props<T> = {
	label: string;
	options: readonly T[];
	value: T;
	onChange: (event: React.MouseEvent<HTMLElement>, newValue: T) => void;
};

function SettingsButtonToggle<T extends string>({
	label,
	options,
	value,
	onChange,
}: Props<T>) {
	return (
		<ListItem>
			<ListItemText primary={label} />
			<ToggleButtonGroup
				color="primary"
				value={value}
				exclusive
				onChange={onChange}
			>
				{options.map(option => (
					<ToggleButton key={option} value={option}>
						{option}
					</ToggleButton>
				))}
			</ToggleButtonGroup>
		</ListItem>
	);
}

export default SettingsButtonToggle;

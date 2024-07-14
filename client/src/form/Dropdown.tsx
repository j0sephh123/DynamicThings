import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

type Props<T extends readonly string[]> = {
	options: T;
	selectedOption: T[number];
	setSelectedOption: (option: T[number]) => void;
	label: string;
};

export default function Dropdown<T extends readonly string[]>({
	options,
	selectedOption,
	setSelectedOption,
	label,
}: Props<T>) {
	return (
		<FormControl fullWidth>
			<InputLabel>{label}</InputLabel>
			<Select
				value={selectedOption}
				label={label}
				onChange={e => setSelectedOption(e.target.value as T[number])}
			>
				{options.map(option => (
					<MenuItem key={option} value={option}>
						{option}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
}

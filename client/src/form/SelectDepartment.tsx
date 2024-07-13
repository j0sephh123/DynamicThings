import { MenuItem, Select } from '@mui/material';
import { employeeDepartments } from '../../../server/constants';

type P = {
	selectedDepartment: (typeof employeeDepartments)[number];
	setSelectedDepartment: (
		department: (typeof employeeDepartments)[number]
	) => void;
};

export default function SelectDepartment({
	selectedDepartment,
	setSelectedDepartment,
}: P) {
	return (
		<Select
			labelId="demo-simple-select-label"
			id="demo-simple-select"
			value={selectedDepartment}
			label="Department"
			onChange={e =>
				setSelectedDepartment(
					e.target.value as (typeof employeeDepartments)[number]
				)
			}
		>
			{employeeDepartments.map(department => (
				<MenuItem key={department} value={department}>
					{department}
				</MenuItem>
			))}
		</Select>
	);
}

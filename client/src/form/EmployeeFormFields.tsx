import { Grid, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import {
	employeeDepartments,
	employeePositions,
	employeeExperience,
} from '../../../server/constants';
import Dropdown from './Dropdown';
import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import useTypedState from '../hooks/useTypedState';

type Props = {
	nameDefaultValue: string;
	departmentDefaultValue: (typeof employeeDepartments)[number];
	positionDefaultValue: (typeof employeePositions)[number];
	experienceDefaultValue: (typeof employeeExperience)[number];
	hireDateDefaultValue: string;
};

// TODO this should be re-used for SaveEmployeeModal to avoid duplication
export default function EmployeeFormFields({
	departmentDefaultValue,
	experienceDefaultValue,
	hireDateDefaultValue,
	positionDefaultValue,
	nameDefaultValue,
}: Props) {
	const [hireDate, setHireDate] = useState<Dayjs | null>(
		dayjs(hireDateDefaultValue)
	);
	const [nameInput, setNameInput] = useState(nameDefaultValue);
	const [selectedDepartment, setSelectedDepartment] = useTypedState(
		departmentDefaultValue
	);
	const [selectedPosition, setSelectedPosition] =
		useTypedState(positionDefaultValue);
	const [selectedExperience, setSelectedExperience] = useTypedState(
		experienceDefaultValue
	);

	return (
		<Grid container spacing={4}>
			<Grid item xs={6}>
				<TextField
					value={nameInput}
					onChange={e => setNameInput(e.currentTarget.value)}
					label="Name"
					variant="outlined"
					sx={{
						width: '100%',
					}}
				/>
			</Grid>
			<Grid item xs={6}>
				<Dropdown
					label="Experience"
					options={employeeExperience}
					selectedOption={selectedExperience}
					setSelectedOption={setSelectedExperience}
				/>
			</Grid>
			<Grid item xs={6}>
				<Dropdown
					label="Department"
					options={employeeDepartments}
					selectedOption={selectedDepartment}
					setSelectedOption={setSelectedDepartment}
				/>
			</Grid>
			<Grid item xs={6}>
				<Dropdown
					label="Position"
					options={employeePositions}
					selectedOption={selectedPosition}
					setSelectedOption={setSelectedPosition}
				/>
			</Grid>
			<Grid item xs={6}>
				<DatePicker
					value={hireDate}
					onChange={setHireDate}
					sx={{
						width: '100%',
					}}
					label="Hire Date"
					disableFuture
				/>
			</Grid>
		</Grid>
	);
}

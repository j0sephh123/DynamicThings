import {
	employeeDepartments,
	employeePositions,
} from '../../../server/constants';
import { useCreateEmployee } from '../api/queries';
import useTypedState from '../hooks/useTypedState';
import Dropdown from './Dropdown';
import GenericModal from '../modals/GenericModal';
import { Stack, TextField } from '@mui/material';
import { useState } from 'react';

export default function CreateEmployeeForm() {
  const [nameInput, setNameInput] = useState('');
	const [selectedDepartment, setSelectedDepartment] =
		useTypedState(employeeDepartments);
	const [selectedPosition, setSelectedPosition] =
		useTypedState(employeePositions);

	const createEmployeeMutation = useCreateEmployee();

	const handleCreateEmployee = () => {
		createEmployeeMutation({
			department: selectedDepartment,
			experience: 1,
			name: nameInput,
			position: selectedPosition,
		});
	};

	return (
		<GenericModal
			triggerLabel="Create Employee"
			onSubmit={handleCreateEmployee}
		>
			<Stack spacing={3}>
				<TextField
					value={nameInput}
					onChange={e => setNameInput(e.currentTarget.value)}
					label="Name"
					variant="outlined"
				/>
				<Dropdown
					label="Department"
					options={employeeDepartments}
					selectedOption={selectedDepartment}
					setSelectedOption={setSelectedDepartment}
				/>
				<Dropdown
					label="Position"
					options={employeePositions}
					selectedOption={selectedPosition}
					setSelectedOption={setSelectedPosition}
				/>
			</Stack>
		</GenericModal>
	);
}

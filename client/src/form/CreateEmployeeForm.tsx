import {
	employeeDepartments,
	employeePositions,
	employeeExperience,
} from '../../../server/constants';
import { useCreateEmployee } from '../api/queries';
import useTypedState from '../hooks/useTypedState';
import Dropdown from './Dropdown';
import GenericModal from '../modals/GenericModal';
import { Stack, TextField } from '@mui/material';
import { useState } from 'react';
import { useAppContext } from '../context/AppContextProvider';
import { useQueryClient } from '@tanstack/react-query';

export default function CreateEmployeeForm() {
	const queryClient = useQueryClient();

	const { closeModal } = useAppContext();
	const [nameInput, setNameInput] = useState('');
	const [selectedDepartment, setSelectedDepartment] =
		useTypedState(employeeDepartments);
	const [selectedPosition, setSelectedPosition] =
		useTypedState(employeePositions);
	const [selectedExperience, setSelectedExperience] =
		useTypedState(employeeExperience);

	const createEmployeeMutation = useCreateEmployee();

	const handleCreateEmployee = () => {
		createEmployeeMutation({
			department: selectedDepartment,
			experience: selectedExperience,
			name: nameInput,
			position: selectedPosition,
		}).then(() => {
			console.log('succes');

			queryClient.invalidateQueries({
				queryKey: ['employees'],
			});
			closeModal();
		});
	};

	return (
		<GenericModal label="Create Employee" onSubmit={handleCreateEmployee}>
			<Stack spacing={3}>
				<TextField
					value={nameInput}
					onChange={e => setNameInput(e.currentTarget.value)}
					label="Name"
					variant="outlined"
				/>
				<Dropdown
					label="Experience"
					options={employeeExperience}
					selectedOption={selectedExperience}
					setSelectedOption={setSelectedExperience}
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

import {
	employeeDepartments,
	employeePositions,
	employeeExperience,
} from '../../../server/constants';
import { useCreateEmployee, useUpdateEmployee } from '../api/queries';
import useTypedState from '../hooks/useTypedState';
import Dropdown from './Dropdown';
import GenericModal from '../modals/GenericModal';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';
import { useState } from 'react';
import { ModalTypes, useAppContext } from '../context/AppContext/AppContext';
import { useQueryClient } from '@tanstack/react-query';
import { getEmployeesQueryKey } from '../api/queryKeys';
import { isEditEmployeeModal } from '../type-guards';
import { Box } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

export type EmployeeFormProps = {
	type: Extract<ModalTypes, 'editEmployee' | 'createEmployee'>;
};

const labels = {
	editEmployee: 'Edit Employee',
	createEmployee: 'Create Employee',
} as const;

export default function EmployeeForm({ type }: EmployeeFormProps) {
	const { closeModal, currentModal } = useAppContext();
	const isEdit = isEditEmployeeModal(currentModal);
	const queryClient = useQueryClient();

	const [nameInput, setNameInput] = useState(
		isEdit ? currentModal.employee.name : ''
	);
	const [selectedDepartment, setSelectedDepartment] = useTypedState(
		isEdit ? currentModal.employee.department : employeeDepartments[0]
	);
	const [selectedPosition, setSelectedPosition] = useTypedState(
		isEdit ? currentModal.employee.position : employeePositions[0]
	);
	const [selectedExperience, setSelectedExperience] = useTypedState(
		isEdit ? currentModal.employee.experience : employeeExperience[0]
	);

	const createEmployeeMutation = useCreateEmployee({
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: getEmployeesQueryKey(),
			});
			closeModal();
		},
	});
	const updateEmployeeMutation = useUpdateEmployee({
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: getEmployeesQueryKey(),
			});
			closeModal();
		},
	});

	const handleSubmit = () => {
		const fields = {
			department: selectedDepartment,
			experience: selectedExperience,
			name: nameInput,
			position: selectedPosition,
		};

		if (type === 'createEmployee') {
			createEmployeeMutation(fields);
		} else if (isEdit) {
			updateEmployeeMutation({
				...fields,
				id: currentModal.employee.id,
			});
		}
	};

	return (
		<GenericModal label={labels[type]} onSubmit={handleSubmit}>
			<Box sx={{ flexGrow: 1 }}>
				<Grid container spacing={4}>
					<Grid xs={6}>
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
					<Grid xs={6}>
						<Dropdown
							label="Experience"
							options={employeeExperience}
							selectedOption={selectedExperience}
							setSelectedOption={setSelectedExperience}
						/>
					</Grid>
					<Grid xs={6}>
						<Dropdown
							label="Department"
							options={employeeDepartments}
							selectedOption={selectedDepartment}
							setSelectedOption={setSelectedDepartment}
						/>
					</Grid>
					<Grid xs={6}>
						<Dropdown
							label="Position"
							options={employeePositions}
							selectedOption={selectedPosition}
							setSelectedOption={setSelectedPosition}
						/>
					</Grid>
					<Grid xs={6}>
						<DatePicker
							sx={{
								width: '100%',
							}}
							label="Hire Date"
						/>
					</Grid>
				</Grid>
			</Box>
			<Stack spacing={3}></Stack>
		</GenericModal>
	);
}

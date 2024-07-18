import {
	employeeDepartments,
	employeePositions,
	employeeExperience,
} from '../../../server/constants';
import { useCreateEmployee, useUpdateEmployee } from '../api/queries';
import useTypedState from '../hooks/useTypedState';
import Dropdown from './Dropdown';
import GenericModal from '../modals/GenericModal';
import { Stack, TextField } from '@mui/material';
import { useState } from 'react';
import { ModalTypes, useAppContext } from '../context/AppContext/AppContext';
import { useQueryClient } from '@tanstack/react-query';
import { getEmployeesQueryKey } from '../api/queryKeys';
import { isEditEmployeeModal } from '../type-guards';

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

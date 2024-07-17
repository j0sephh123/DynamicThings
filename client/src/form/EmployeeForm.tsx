import {
	employeeDepartments,
	employeePositions,
	employeeExperience,
} from '../../../server/constants';
import { useSaveEmployee } from '../api/queries';
import useTypedState from '../hooks/useTypedState';
import Dropdown from './Dropdown';
import GenericModal from '../modals/GenericModal';
import { Stack, TextField } from '@mui/material';
import { useState } from 'react';
import { ModalTypes, useAppContext } from '../context/AppContext/AppContext';
import { useQueryClient } from '@tanstack/react-query';
import { getEmployeesQueryKey } from '../api/queryKeys';
import { Employee, EmployeeCreateRequest } from '@server/sharedTypes';
import { isEditEmployeeModal } from '../context/AppContext/type-guards';

type Props = {
	type: Extract<ModalTypes, 'editEmployee' | 'createEmployee'>;
};

const labels = {
	editEmployee: 'Edit Employee',
	createEmployee: 'Create Employee',
} as const;

export default function EmployeeForm({ type }: Props) {
	const { closeModal, currentModal } = useAppContext();
	const isEdit = isEditEmployeeModal(currentModal);
	const queryClient = useQueryClient();

	// const employee = queryClient.getQueryData<Employee[]>(getEmployeesQueryKey())?.find(e=>e.id===);

	// console.log(employee);

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

	const saveEmployeeMutation = useSaveEmployee({
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: getEmployeesQueryKey(),
			});
			closeModal();
		},
	});

	const handleSubmit = () => {
		const employeeCreateRequest: EmployeeCreateRequest = {
			department: selectedDepartment,
			experience: selectedExperience,
			name: nameInput,
			position: selectedPosition,
		};

		saveEmployeeMutation(employeeCreateRequest);
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

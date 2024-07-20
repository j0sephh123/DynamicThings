import { useState, useEffect } from 'react';
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
import { ModalTypes, useAppContext } from '../context/AppContext/AppContext';
import { useQueryClient } from '@tanstack/react-query';
import { getEmployeesQueryKey } from '../api/queryKeys';
import { isEditEmployeeModal } from '../type-guards';
import { Box } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { EmployeeSaveRequest } from '@server/zodValidators';

export type EmployeeFormProps = {
	type: Extract<ModalTypes, 'editEmployee' | 'createEmployee'>;
};

const labels = {
	editEmployee: 'Edit Employee',
	createEmployee: 'Create Employee',
} as const;

export default function EmployeeForm({ type }: EmployeeFormProps) {
	const [nameError, setNameError] = useState('');
	const { closeModal, currentModal } = useAppContext();
	const isEdit = isEditEmployeeModal(currentModal);
	const queryClient = useQueryClient();

	const [hireDate, setHireDate] = useState<Dayjs | null>(dayjs('2022-04-17'));

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

	const handleSuccess = () => {
		queryClient.invalidateQueries({
			queryKey: getEmployeesQueryKey(),
		});
		closeModal();
	};

	const createEmployeeMutation = useCreateEmployee({
		onSuccess: handleSuccess,
		onError(error) {
			const path = error.issues[0].path[0] as string;
			if (path === 'name') {
				setNameError(error.issues[0].message);
			}
		},
	});

	const updateEmployeeMutation = useUpdateEmployee({
		onSuccess: handleSuccess,
		onError(error) {
			const path = error.issues[0].path[0] as string;
			if (path === 'name') {
				setNameError(error.issues[0].message);
			}
		},
	});

	const handleSubmit = () => {
		if (!hireDate) {
			return;
		}

		const fields: EmployeeSaveRequest = {
			department: selectedDepartment,
			experience: selectedExperience,
			name: nameInput,
			position: selectedPosition,
			hireDate: hireDate.toString(),
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

	useEffect(() => {
		if (nameError) {
			setNameError('');
		}
	}, [nameInput]);

	return (
		<GenericModal
			isDisabled={!!nameError}
			label={labels[type]}
			onSubmit={handleSubmit}
		>
			<Box sx={{ flexGrow: 1 }}>
				<Grid container spacing={4}>
					<Grid xs={6}>
						<TextField
							error={!!nameError}
							helperText={nameError}
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
			</Box>
			<Stack spacing={3}></Stack>
		</GenericModal>
	);
}

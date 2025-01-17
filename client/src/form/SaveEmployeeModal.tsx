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
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import {
	ModalTypes,
	useModalContext,
} from '../context/ModalContext/ModalContext';
import { isEditEmployeeModal } from '../type-guards';
import { Box } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { EmployeeSaveRequest } from '@server/zodValidators';
import useQueryClientActions from '../api/useQueryClientActions';

export type EmployeeFormProps = {
	type: Extract<ModalTypes, 'editEmployee' | 'createEmployee'>;
};

const labels = {
	editEmployee: 'Edit Employee',
	createEmployee: 'Create Employee',
} as const;

export default function SaveEmployeeModal({ type }: EmployeeFormProps) {
	const [nameError, setNameError] = useState('');
	const { closeModal, currentModal } = useModalContext();
	const isEdit = isEditEmployeeModal(currentModal);
	const { invalidateEmployees } = useQueryClientActions();

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
		invalidateEmployees();
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
		// FIXME doesn't work
		if (nameError) {
			setNameError('');
		}
	}, [nameError, nameInput]);

	return (
		<GenericModal
			isDisabled={!!nameError}
			label={labels[type]}
			onSubmit={handleSubmit}
		>
			<Box sx={{ flexGrow: 1 }}>
				<Grid container spacing={4}>
					<Grid item xs={6}>
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
			</Box>
		</GenericModal>
	);
}

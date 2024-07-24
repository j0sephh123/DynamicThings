import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { PropsWithChildren, useEffect, useMemo, useRef, useState } from 'react';
import CardHeader from '../../../primitives/CardHeader';
import {
	employeeDepartments,
	employeeExperience,
	employeePositions,
} from '../../../../../server/constants';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import Dropdown from '../../../form/Dropdown';
import useTypedState from '../../../hooks/useTypedState';
import { useLoaderData } from 'react-router-dom';
import { getEmployeeProfile, useUpdateEmployee } from '../../../api/queries';
import shallowCompare from '../../../utils/shallowCompare';
import useQueryClientActions from '../../../api/useQueryClientActions';
import FiberManualRecordIcon from '../../../icons/FiberManualRecordIcon';

const CardContent = ({ children }: PropsWithChildren) => {
	return (
		<Box
			sx={theme => ({
				p: theme.spacing(2),
				border: `1px solid ${theme.palette.grey[700]}`,
				borderTop: 'none',
				borderBottomLeftRadius: theme.shape.borderRadius,
				borderBottomRightRadius: theme.shape.borderRadius,
			})}
		>
			{children}
		</Box>
	);
};

export default function EmployeeDetails() {
	const [nameError, setNameError] = useState('');
	const employeeProfile = useLoaderData() as Awaited<
		ReturnType<typeof getEmployeeProfile>
	>;

	const initialDetailsRef = useRef(employeeProfile);

	const [hireDate, setHireDate] = useState<Dayjs | null>(
		dayjs(employeeProfile.hireDate)
	);
	const [nameInput, setNameInput] = useState(employeeProfile.name);
	const [selectedDepartment, setSelectedDepartment] = useTypedState(
		employeeProfile.department
	);
	const [selectedPosition, setSelectedPosition] = useTypedState(
		employeeProfile.position
	);
	const [selectedExperience, setSelectedExperience] = useTypedState(
		employeeProfile.experience
	);

	const hasUserModifiedFields = useMemo(() => {
		const initialDetails: Omit<typeof employeeProfile, 'id'> = {
			department: initialDetailsRef.current.department,
			experience: initialDetailsRef.current.experience,
			hireDate: dayjs(initialDetailsRef.current.hireDate).format('YYYY-MM-DD'),
			name: initialDetailsRef.current.name,
			position: initialDetailsRef.current.position,
		};

		const fields: Omit<typeof employeeProfile, 'id'> = {
			hireDate: hireDate?.format('YYYY-MM-DD') as string,
			name: nameInput,
			department: selectedDepartment,
			position: selectedPosition,
			experience: selectedExperience,
		};

		return !shallowCompare(initialDetails, fields);
	}, [
		hireDate,
		nameInput,
		selectedDepartment,
		selectedExperience,
		selectedPosition,
	]);

	const { refetchEmployeeProfile } = useQueryClientActions();
	const updateEmployeeMutation = useUpdateEmployee({
		onSuccess: employeeVariables => {
			// FIXME cause re-render
			initialDetailsRef.current = employeeVariables;
			refetchEmployeeProfile(employeeProfile.id);
		},
		// TODO reinstate validation
		onError(error) {
			const path = error.issues[0].path[0] as string;
			if (path === 'name') {
				setNameError(error.issues[0].message);
			}
		},
	});

	const handleSave = () => {
		if (!hireDate) {
			return;
		}

		updateEmployeeMutation({
			id: employeeProfile.id,
			department: selectedDepartment,
			experience: selectedExperience,
			name: nameInput,
			position: selectedPosition,
			hireDate: hireDate.toString(),
		});
	};

	useEffect(() => {
		// FIXME doesn't work
		if (nameError) {
			setNameError('');
		}
	}, [nameError, nameInput]);

	return (
		<Grid container spacing={1}>
			<Grid item xs={4}>
				<CardHeader>Profile Picture</CardHeader>
				<CardContent>
					<Box
						sx={{
							height: '100px',
							width: '100px',
							borderRadius: '50%',
						}}
						src="/cat.jpg"
						component="img"
					/>
					<Typography variant="body2">
						Upload/Change Your Profile Image
					</Typography>
				</CardContent>
			</Grid>
			<Grid item xs={8}>
				<CardHeader>Edit Account Details</CardHeader>
				<CardContent>
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
								label="Hire Date"
								disableFuture
							/>
						</Grid>
						<Grid item xs={12}>
							<Button
								onClick={handleSave}
								disabled={!hasUserModifiedFields}
								color="success"
								endIcon={
									hasUserModifiedFields ? <FiberManualRecordIcon /> : undefined
								}
								variant="contained"
								fullWidth
							>
								Save {nameError ? 'Error' : ''}
							</Button>
						</Grid>
					</Grid>
				</CardContent>
			</Grid>
		</Grid>
	);
}

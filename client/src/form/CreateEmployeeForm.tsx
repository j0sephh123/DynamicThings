import {
	employeeDepartments,
	employeePositions,
} from '../../../server/constants';
import { useCreateEmployee } from '../api/queries';
import useTypedState from '../hooks/useTypedState';
import Dropdown from './Dropdown';
import GenericModal from '../modals/GenericModal';

export default function CreateEmployeeForm() {
	const [selectedDepartment, setSelectedDepartment] =
		useTypedState(employeeDepartments);
	const [selectedPosition, setSelectedPosition] =
		useTypedState(employeePositions);

	const createEmployeeMutation = useCreateEmployee();

	const handleCreateEmployee = () => {
		createEmployeeMutation({
			department: selectedDepartment,
			experience: 1,
			name: 'John Doe',
			position: selectedPosition,
		});
	};

	return (
		<GenericModal
			triggerLabel="Create Employee"
			onSubmit={handleCreateEmployee}
		>
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
		</GenericModal>
	);
}

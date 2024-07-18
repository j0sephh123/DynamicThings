import { Employee } from '@server/sharedTypes';
import { EmployeesGetResponse } from '../../api/apiTypes';

export type EmployeesListProps = {
	employees: EmployeesGetResponse;
};

export type EmployeesItemProps = {
	employee: Employee;
	onEmployeeDelete: () => void;
	onEmployeeEdit: () => void;
};

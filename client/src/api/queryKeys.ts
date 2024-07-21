import { Employee } from '@server/sharedTypes';

// with dynamic query data, functions are more concise and easier to maintain
const queryKeys = {
	employees: ['employees'],
	employeeProfile: ['employeeProfile'], // TODO add dynamic key as well
	createEmployee: ['createEmployee'],
};

export const getEmployeesQueryKey = () => queryKeys.employees;

export const getEmployeeProfileQueryKey = (id: Employee['id']) => [
	...queryKeys.employeeProfile,
	id,
];

export const createEmployeeQueryKey = () => queryKeys.createEmployee;

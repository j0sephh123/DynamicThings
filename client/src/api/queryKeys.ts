// with dynamic query data, functions are more concise and easier to maintain
const queryKeys = {
	employees: ['employees'],
	createEmployee: ['createEmployee'],
};

export const getEmployeesQueryKey = () => queryKeys.employees;

export const createEmployeeQueryKey = () => queryKeys.createEmployee;

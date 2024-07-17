import { Employee } from '@server/sharedTypes';

const apiEndpoints = {
	employees: '/api/employees',
	employeeCreate: '/api/employees',
	employeeUpdate: (employee: Employee) => `/api/employees/${employee.id}`,
	employeeDelete: (id: Employee['id']) => `/api/employees/${id}`,
} as const;

export default apiEndpoints;

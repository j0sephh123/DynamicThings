import { Employee } from '@server/sharedTypes';

const apiEndpoints = {
	employees: '/api/employees',
	employeeCreate: '/api/employees',
	employeeDelete: (id: Employee['id']) => `/api/employees/${id}`,
} as const;

export default apiEndpoints;

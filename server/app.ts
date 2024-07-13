import { Hono } from 'hono';
import type { Employee } from './sharedTypes';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import zodValidators from './zodValidators';

const app = new Hono();

// Updated the function to create employee data
function createEmployee(
	id: number,
	name: string,
	position: string,
	department: string,
	experience: number
): Employee {
	return { id, name, position, department, experience };
}

// Updated rows to represent employees
const employees = [
	createEmployee(1, 'John Doe', 'Software Engineer', 'Development', 5),
	createEmployee(2, 'Jane Smith', 'Project Manager', 'Project Management', 8),
	createEmployee(3, 'Emma Johnson', 'UI/UX Designer', 'Design', 4),
	createEmployee(4, 'Michael Brown', 'DevOps Engineer', 'Operations', 3),
	createEmployee(5, 'Isabella Davis', 'Product Manager', 'Product', 6),
];

const appRoutes = app
	.get('/api/employees', c => {
		return c.json(employees);
	})
	.post('/api/employees', zValidator('json', zodValidators.employeePost), c => {
		return c.json({ a: 5 });
	});

export type AppRouter = typeof appRoutes;

export default app;

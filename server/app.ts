import { Hono } from 'hono';
import type { Employee } from './sharedTypes';
import { zValidator } from '@hono/zod-validator';
import zodValidators from './zodValidators';
import createEmployeeFactory from './createEmployeeFactory';
import type { z } from 'zod';

const app = new Hono();

const employees = [
	createEmployeeFactory({
		department: 'Development',
		experience: 5,
		name: 'John Doe',
		position: 'DevOps Engineer',
	}),
	createEmployeeFactory({
		department: 'Development',
		experience: 2,
		name: 'Alice Smith',
		position: 'Project Manager',
	}),
	createEmployeeFactory({
		department: 'Development',
		experience: 3,
		name: 'Bob Brown',
		position: 'Software Engineer',
	}),
];

const appRoutes = app
	.get('/api/employees', c => {
		return c.json(employees);
	})
	.post(
		'/api/employees',
		zValidator('json', zodValidators.employeePost),
		async c => {
			const employeeCreateRequest = (await c.req.json()) as z.infer<
				typeof zodValidators.employeePost
			>;
			const createdEmployee = createEmployeeFactory(employeeCreateRequest);

			employees.push(createdEmployee);

			return c.json(createdEmployee);
		}
	);

export type AppRouter = typeof appRoutes;

export default app;

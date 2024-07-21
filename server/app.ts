import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import zodValidators from './zodValidators';
import createEmployeeFactory from './createEmployeeFactory';
import type { z } from 'zod';
import { logger } from 'hono/logger';
import { HTTPException } from 'hono/http-exception';

const app = new Hono();

const employees = [
	createEmployeeFactory({
		department: 'Development',
		experience: 'Intern',
		name: 'John Doe',
		position: 'DevOps Engineer',
		hireDate: new Date('2021-04-03').toDateString(),
	}),
	createEmployeeFactory({
		department: 'Development',
		experience: 'Lead',
		name: 'Alice Smith',
		position: 'Project Manager',
		hireDate: new Date('2020-02-01').toDateString(),
	}),
	createEmployeeFactory({
		department: 'Development',
		experience: 'Senior',
		name: 'Bob Brown',
		position: 'Software Engineer',
		hireDate: new Date('2021-01-01').toDateString(),
	}),
];

app.use('*', logger());

const appRouter = app
	.get('/api/employees', c => {
		return c.json(employees);
	})
	.get(
		'/api/employees/:id',
		zValidator('param', zodValidators.employeeGet),
		async c => {
			const employeeId = c.req.param('id');
			const employee = employees.find(employee => employee.id === employeeId);

			if (!employee) {
				throw new HTTPException(404, { message: 'Employee not found' });
			}

			return c.json(employee);
		}
	)
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
	)
	.delete(
		'/api/employees/:id',
		zValidator('param', zodValidators.employeeDelete),
		async c => {
			const employeeId = c.req.param('id');
			const employeeIndex = employees.findIndex(
				employee => employee.id === employeeId
			);

			if (employeeIndex === -1) {
				throw new HTTPException(404, { message: 'Employee not found' });
			}

			employees.splice(employeeIndex, 1);

			return c.json({ message: 'Employee deleted' });
		}
	)
	.put(
		'/api/employees/:id',
		zValidator('param', zodValidators.employeePutParam),
		zValidator('json', zodValidators.employeePut),
		async c => {
			const employeeId = c.req.param('id');
			const employeeIndex = employees.findIndex(
				employee => employee.id === employeeId
			);

			console.log({
				employeeId,
				employeeIndex,
				employees,
			});

			if (employeeIndex === -1) {
				throw new HTTPException(404, { message: 'Employee not found' });
			}

			const employeePutRequest = (await c.req.json()) as z.infer<
				typeof zodValidators.employeePut
			>;

			employees[employeeIndex] = {
				...employees[employeeIndex],
				...employeePutRequest,
			};

			console.log({
				employeeIndex,
				employeePutRequest,
				employee: employees[employeeIndex],
			});

			return c.json(employees[employeeIndex]);
		}
	);

export type AppRouter = typeof appRouter;

export default app;

import { z } from 'zod';
import {
	employeeDepartments,
	employeePositions,
	employeeExperience,
} from './constants';

const zodValidators = {
	employeePost: z.object({
		experience: z.enum(employeeExperience),
		name: z.string().min(2).max(100),
		department: z.enum(employeeDepartments),
		position: z.enum(employeePositions),
	}),
	employeeDelete: z.object({
		id: z.string(),
	}),
	employeePutParam: z.object({
		id: z.string(),
	}),
	employeePut: z.object({
		id: z.string(),
		experience: z.enum(employeeExperience),
		name: z.string().min(2).max(100),
		department: z.enum(employeeDepartments),
		position: z.enum(employeePositions),
	}),
} as const;

export type EmployeeSaveRequest = z.infer<typeof zodValidators.employeePost>;
export type EmployeeDeleteRequest = z.infer<
	typeof zodValidators.employeeDelete
>;

export default zodValidators;

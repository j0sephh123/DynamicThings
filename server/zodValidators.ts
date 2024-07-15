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
		id: z.string().refine(
			value => {
				const parsed = parseInt(value, 10);
				return !isNaN(parsed) && parsed.toString() === value;
			},
			{
				message: 'ID must be a string representing an integer',
			}
		),
	}),
} as const;

export type EmployeeCreateRequest = z.infer<typeof zodValidators.employeePost>;
export type EmployeeDeleteRequest = z.infer<typeof zodValidators.employeeDelete>;

export default zodValidators;

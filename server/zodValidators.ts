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
} as const;

export type EmployeeCreateRequest = z.infer<typeof zodValidators.employeePost>;

export default zodValidators;

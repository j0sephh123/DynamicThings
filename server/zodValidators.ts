import { z } from 'zod';

const zodValidators = {
	employeePost: z.object({
		department: z.string(),
		experience: z.number(),
		id: z.number(),
		name: z.string(),
		position: z.string(),
	}),
} as const;

export type EmployeeCreateRequest = z.infer<typeof zodValidators.employeePost> ;

export default zodValidators;

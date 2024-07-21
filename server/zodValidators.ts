import { z, ZodError } from 'zod';
import {
	employeeDepartments,
	employeePositions,
	employeeExperience,
} from './constants';
import dayjs from 'dayjs';

const idParamValidator = z.object({
	id: z.string(),
});

const employeeCommonValidator = z.object({
	experience: z.enum(employeeExperience),
	name: z.string().min(2).max(100),
	department: z.enum(employeeDepartments),
	position: z.enum(employeePositions),
	hireDate: z.string().refine(date => {
		const parsedDate = dayjs(date);
		return parsedDate.isValid() && parsedDate.isBefore(dayjs());
	}, 'Hire date must be a valid date string and before today'),
});

const zodValidators = {
	employeePost: employeeCommonValidator,
	employeeDelete: idParamValidator,
	employeePutParam: idParamValidator,
	employeePut: employeeCommonValidator.extend({
		id: z.string(),
	}),
	employeeGet: idParamValidator,
} as const;

export type EmployeeSaveRequest = z.infer<typeof zodValidators.employeePost>;
export type EmployeeDeleteRequest = z.infer<
	typeof zodValidators.employeeDelete
>;
export type EmployeePostError = ZodError<typeof zodValidators.employeePost>;
export type EmployeePutError = ZodError<typeof zodValidators.employeePut>;

export default zodValidators;

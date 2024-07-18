import type { AppRouter } from './app';
import type {
	EmployeeSaveRequest,
	EmployeeDeleteRequest,
} from './zodValidators';

export type { AppRouter, EmployeeSaveRequest, EmployeeDeleteRequest };

export type Employee = {
	id: string;
} & EmployeeSaveRequest;

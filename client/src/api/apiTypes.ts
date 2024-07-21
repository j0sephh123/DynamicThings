import { InferResponseType } from 'hono';
import { apiClient } from './fetchApi';

export type EmployeesGetResponse = InferResponseType<
	typeof apiClient.api.employees.$get
>;

export type EmployeesSaveResponse = InferResponseType<
	typeof apiClient.api.employees.$post
>;

export type EmployeeGetResponse = InferResponseType<
	typeof apiClient.api.employees[':id']['$get']
>;

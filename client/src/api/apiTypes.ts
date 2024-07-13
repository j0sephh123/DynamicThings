import { InferResponseType } from 'hono';
import { apiClient } from './fetchApi';

export type EmployeesGetResponse = InferResponseType<
	typeof apiClient.api.employees.$get
>;

export type EmployeesCreateResponse = InferResponseType<
	typeof apiClient.api.employees.$post
>;
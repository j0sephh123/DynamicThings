export type Employee = {
	id: number;
	name: string;
	position: string;
	department: string;
	experience: number;
};

export type Responses = {
	employees: Employee[];
};

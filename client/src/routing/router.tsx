import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import EmployeeProfile from '../components/EmployeeProfile';
import { getEmployeeProfile } from '../api/queries';
import EmployeeDetails from '../components/EmployeeProfile/EmployeeDetails';
import EmployeeJob from '../components/EmployeeProfile/EmployeeJob';
import EmployeesPage from '../pages/EmployeesPage';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: '',
				element: <div>Home</div>,
			},
			{
				path: 'about',
				element: <div>About</div>,
			},
			{
				path: 'employees',
				element: <EmployeesPage />,
			},
			{
				path: 'employees/:id',
				element: <EmployeeProfile />,
				loader: ({ params: { id } }) => {
					if (!id) return null;

					return getEmployeeProfile(id);
				},
				children: [
					{
						path: 'details',
						element: <EmployeeDetails />,
					},
					{
						path: 'job',
						element: <EmployeeJob />,
					},
				],
			},
		],
	},
]);

export default router;

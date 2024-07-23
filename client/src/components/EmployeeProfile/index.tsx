import {
	matchPath,
	Outlet,
	Link as RouterLink,
	useLoaderData,
	useLocation,
} from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { getEmployeeProfile } from '../../api/queries';
import {
	Typography,
	Container,
	Paper,
	Tab,
	Tabs,
	Link,
	Divider,
} from '@mui/material';
import WorkIcon from '../../icons/WorkIcon';
import PersonIcon from '../../icons/PersonIcon';

export default function EmployeeProfile() {
	const employeeProfile = useLoaderData() as Awaited<
		ReturnType<typeof getEmployeeProfile>
	>;

	const routeMatch = useRouteMatch([
		'/employees/:id/details',
		'/employees/:id/job',
	]);
	const currentTab = routeMatch?.pattern?.path;

	function handleBreadcrumbClick(
		event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
	) {
		event.preventDefault();
		console.info('You clicked a breadcrumb.');
	}

	const breadcrumbs = [
		<Link
			underline="hover"
			key="1"
			color="inherit"
			href="/"
			onClick={handleBreadcrumbClick}
		>
			MUI
		</Link>,
		<Link
			underline="hover"
			key="2"
			color="inherit"
			href="/material-ui/getting-started/installation/"
			onClick={handleBreadcrumbClick}
		>
			Core
		</Link>,
		<Typography key="3" color="text.primary">
			Breadcrumb
		</Typography>,
	];

	if (!employeeProfile) {
		return;
	}

	return (
		<div>
			<Container sx={{ mt: 2 }} maxWidth="md">
				<Paper
					sx={{
						p: 3,
						// TODO find a nicer way to avoid inline styles
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<Typography variant="h5">Employee Profile</Typography>
					<Breadcrumbs separator=">" aria-label="breadcrumb">
						{breadcrumbs}
					</Breadcrumbs>
				</Paper>
			</Container>

			<Container sx={{ mt: 2 }} maxWidth="md">
				<Paper square sx={{ p: 3 }}>
					<Tabs value={currentTab}>
						<Tab
							value="/employees/:id/details"
							to={`/employees/${employeeProfile.id}/details`}
							component={RouterLink}
							iconPosition="start"
							icon={<PersonIcon />}
							label="Details"
						/>
						<Tab
							value="/employees/:id/job"
							to={`/employees/${employeeProfile.id}/job`}
							component={RouterLink}
							iconPosition="start"
							icon={<WorkIcon />}
							label="Job"
						/>
					</Tabs>
					<Divider />
					<Outlet />
				</Paper>
			</Container>
		</div>
	);
}

function useRouteMatch(patterns: readonly string[]) {
	const { pathname } = useLocation();

	for (let i = 0; i < patterns.length; i += 1) {
		const pattern = patterns[i];
		const possibleMatch = matchPath(pattern, pathname);
		if (possibleMatch !== null) {
			return possibleMatch;
		}
	}

	return null;
}

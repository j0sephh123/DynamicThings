import {
	List,
	ListItem,
	ListItemText,
	ListItemSecondaryAction,
	Typography,
} from '@mui/material';
import EditIcon from '../../icons/EditIcon';
import DeleteIcon from '../../icons/DeleteIcon';

const data = [
	{
		id: 'f735f84aee',
		name: 'John Doe',
		position: 'DevOps Engineer',
		department: 'Development',
		experience: 'Intern',
	},
	{
		id: 'b41c83b054',
		name: 'Alice Smith',
		position: 'Project Manager',
		department: 'Development',
		experience: 'Lead',
	},
	{
		id: '09219e2bd9',
		name: 'Bob Brownqwrk',
		position: 'Software Engineer',
		department: 'Development',
		experience: 'Senior',
	},
	{
		id: 'e94e10ef04',
		name: 'fff',
		position: 'DevOps Engineer',
		department: 'Finance',
		experience: 'Intern',
	},
];

export default function EmployeesListUi() {
	return (
		<List>
			{data.map(item => (
				<ListItem key={item.id} divider>
					<ListItemText
						primary={<Typography variant="body1">{item.name}</Typography>}
						secondary={
							<>
								<Typography
									component="span"
									variant="body2"
									color="textPrimary"
								>
									{item.position} - {item.department}
								</Typography>
								<Typography
									component="span"
									variant="body2"
									color="textSecondary"
								>
									{' '}
									({item.experience})
								</Typography>
							</>
						}
					/>
					<ListItemSecondaryAction>
						<EditIcon onClick={() => undefined} />
						<DeleteIcon onClick={() => undefined} />
					</ListItemSecondaryAction>
				</ListItem>
			))}
		</List>
	);
}

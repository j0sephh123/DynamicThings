import { Person } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { CommonIconProps } from './types';

export default function PersonIcon({ onClick }: CommonIconProps) {
	return (
		<IconButton onClick={() => typeof onClick === 'function' && onClick()}>
			<Person />
		</IconButton>
	);
}

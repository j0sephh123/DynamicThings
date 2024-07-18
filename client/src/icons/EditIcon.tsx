import { Edit } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { CommonIconProps } from './types';

export default function EditIcon({ onClick }: CommonIconProps) {
	return (
		<IconButton onClick={() => onClick()}>
			<Edit color="success" />
		</IconButton>
	);
}

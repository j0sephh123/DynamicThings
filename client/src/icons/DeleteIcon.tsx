import { Delete } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { CommonIconProps } from './types';

export default function DeleteIcon({ onClick }: CommonIconProps) {
	return (
		<IconButton onClick={() => typeof onClick === 'function' && onClick()}>
			<Delete color="error" />
		</IconButton>
	);
}

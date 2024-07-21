import { Work } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { CommonIconProps } from './types';

export default function WorkIcon({ onClick }: CommonIconProps) {
	return (
		<IconButton onClick={() => typeof onClick === 'function' && onClick()}>
			<Work />
		</IconButton>
	);
}

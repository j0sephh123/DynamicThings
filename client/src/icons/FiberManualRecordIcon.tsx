import { FiberManualRecord } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { CommonIconProps } from './types';

export default function FiberManualRecordIcon({ onClick }: CommonIconProps) {
	return (
		<IconButton onClick={() => typeof onClick === 'function' && onClick()}>
			<FiberManualRecord />
		</IconButton>
	);
}

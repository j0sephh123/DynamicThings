import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { PropsWithChildren } from 'react';

type Props = {
	to: string;
} & PropsWithChildren;

export default function AppLink({ to, children }: Props) {
	return (
		<Link component={RouterLink} to={to}>
			{children}
		</Link>
	);
}

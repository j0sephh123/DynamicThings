import Breadcrumbs from '@mui/material/Breadcrumbs';
import { PropsWithChildren } from 'react';

export default function MuiBreadcrumbs({ children }: PropsWithChildren) {
	return (
		<Breadcrumbs separator=">" aria-label="breadcrumb">
			{children}
		</Breadcrumbs>
	);
}

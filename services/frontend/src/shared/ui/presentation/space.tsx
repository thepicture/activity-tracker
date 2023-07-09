import { Card } from '@mui/material';
import React, { ReactNode } from 'react';

export const Space = ({ children }: { children: ReactNode }) => {
	return (
		<Card elevation={1} sx={{ p: 4, borderRadius: 4 }}>
			{children}
		</Card>
	);
};

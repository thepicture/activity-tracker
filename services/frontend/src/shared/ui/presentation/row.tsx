import { Box } from '@mui/material';
import React, { ReactNode } from 'react';

export const Row = ({ children }: { children: ReactNode }) => {
	return (
		<Box display="flex" flexDirection="column" gap={4}>
			{children}
		</Box>
	);
};

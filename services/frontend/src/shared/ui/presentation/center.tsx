import { Box } from '@mui/material';
import React, { ReactNode } from 'react';

export const Center = ({ children }: { children: ReactNode }) => {
	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			height="100vh"
		>
			{children}
		</Box>
	);
};

import { Alert } from '@mui/material';
import React, { ReactNode } from 'react';

type ErrorProps = {
	children: ReactNode;
};

export const Error = ({ children }: ErrorProps) => {
	return <Alert severity="error">{children}</Alert>;
};

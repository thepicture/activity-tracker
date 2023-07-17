import { Button, ButtonProps } from '@mui/material';
import React, { ReactNode } from 'react';

type MuiButtonWithFillProps = ButtonProps & {
	children: ReactNode;
};

export const MuiButtonWithFill = ({
	children,
	...props
}: MuiButtonWithFillProps) => {
	return (
		<Button variant="contained" {...props}>
			{children}
		</Button>
	);
};

import { Button, ButtonProps } from '@mui/material';
import React, { ReactNode } from 'react';

type MuiButtonWithFillProps = ButtonProps & {
	children: ReactNode;
	action: () => void;
};

export const MuiButtonWithFill = ({
	children,
	action,
	...props
}: MuiButtonWithFillProps) => {
	return (
		<Button variant="contained" action={action} {...props}>
			{children}
		</Button>
	);
};

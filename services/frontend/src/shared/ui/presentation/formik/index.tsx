import React, { HTMLProps, ReactNode } from 'react';

import styles from './styles.module.scss';

type FormikProps = HTMLProps<HTMLFormElement> & {
	children: ReactNode;
};

export const Formik = ({ children, ...props }: FormikProps) => {
	return (
		<form className={styles.form} {...props}>
			{children}
		</form>
	);
};

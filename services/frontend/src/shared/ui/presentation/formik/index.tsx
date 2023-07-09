import React, { ReactNode } from 'react';

import styles from './styles.module.scss';

export const Formik = ({ children, ...props }: { children: ReactNode }) => {
	return (
		<form className={styles.form} {...props}>
			{children}
		</form>
	);
};

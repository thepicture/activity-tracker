import { Input } from '@mui/material';
import React from 'react';

import { viewerModel } from 'entities/viewer';

import {
	Center,
	Formik,
	Logo,
	Row,
	SignIn,
	Space,
	Touch,
} from 'shared/ui/presentation';

export const Auth = () => {
	return (
		<Center>
			<Space>
				<Row>
					<Logo />
					<SignIn />
					<Formik>
						<Input placeholder="Telephone" type="tel" required autoFocus />
						<Input placeholder="Password" type="password" required />
						<Touch action={viewerModel.signIn} type="submit">
							Enter
						</Touch>
					</Formik>
				</Row>
			</Space>
		</Center>
	);
};

import { Input } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React from 'react';
import PhoneInput from 'react-phone-input-material-ui';

import { viewerModel } from 'entities/viewer';

import {
	Center,
	Error,
	Formik,
	Logo,
	Row,
	SignIn,
	Space,
	Touch,
} from 'shared/ui/presentation';

export const Auth = observer(() => (
	<Center>
		<Space>
			<Row>
				<Logo />
				<SignIn />
				<Formik onSubmit={(event) => event.preventDefault()}>
					<PhoneInput
						placeholder="Phone"
						component={Input}
						value={viewerModel.store.phone}
						onChange={viewerModel.store.setPhone}
					/>
					<Input
						placeholder="Password"
						type="password"
						required
						value={viewerModel.store.password}
						onChange={({ target: { value } }) =>
							viewerModel.store.setPassword(value)
						}
					/>
					{viewerModel.store.error && <Error>{viewerModel.store.error}</Error>}
					<Touch
						type="submit"
						disabled={!viewerModel.store.canSignIn}
						onClick={viewerModel.store.signIn}
					>
						Enter
					</Touch>
				</Formik>
			</Row>
		</Space>
	</Center>
));

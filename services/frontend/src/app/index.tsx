import { Routing } from 'pages';
import React from 'react';

import './index.scss';
import { withProviders } from './providers';

const App = () => {
	return (
		<>
			<Routing />
		</>
	);
};

export default withProviders(App);

import { observer } from 'mobx-react-lite';
import React from 'react';
import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const AuthPage = lazy(() => import('./auth'));

export const Routing = observer(() => (
	<Routes>
		<Route path={'/auth'} element={<AuthPage />} />
		<Route path="*" element={<Navigate to={'/auth'} />} />
	</Routes>
));

import { configurePersistable } from 'mobx-persist-store';
import React from 'react';

configurePersistable({
	storage: localStorage,
});

export const withPersistable = (component: () => React.ReactNode) => component;

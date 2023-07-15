import compose from 'compose-function';

import { withPersistable } from './with-persistable';
import { withRouter } from './with-router';

export const withProviders = compose(withRouter, withPersistable);

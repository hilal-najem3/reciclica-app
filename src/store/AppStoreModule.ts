import { StoreModule } from '@ngrx/store';
import { loadingReducer } from './loading/loading.reducers';
import { loginReducer } from './login/login.reducers';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AppStoreModule = [
    StoreModule.forRoot([]),
    StoreModule.forFeature('loading', loadingReducer),
    StoreModule.forFeature('login', loginReducer)
];

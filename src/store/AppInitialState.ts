/* eslint-disable @typescript-eslint/naming-convention */
import { AppState } from './AppState';

export const ApplicationInitialState: AppState = {
    loading: {
        show: false
    },
    login: {
        error: null,
        isRecoveredPassword: false,
        isRecoveringPassword: false,
        isLoggedIn: false,
        isLoggingIn: false
    }
}

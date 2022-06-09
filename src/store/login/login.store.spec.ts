import { User } from 'src/app/models/user/User';
import { ApplicationInitialState } from './../AppInitialState';
import { login, loginSuccess, recoverPassword, recoverPasswordFail, recoverPasswordSuccess, loginFail } from './login.actions';
import { loginReducer } from './login.reducers';
import { LoginState } from './LoginState';

describe('Login store', () => {

    it('recoverPassword', () => {
        const initialState: LoginState = ApplicationInitialState.login;

        const newState = loginReducer(initialState, recoverPassword());

        expect(newState).toEqual({
            ...initialState,
            error: null,
            isRecoveredPassword: false,
            isRecoveringPassword: true
        });
    });

    it('recoverPasswordSuccess', () => {
        const initialState: LoginState = ApplicationInitialState.login;

        const newState = loginReducer(initialState, recoverPasswordSuccess());

        expect(newState).toEqual({
            ...initialState,
            error: null,
            isRecoveredPassword: true,
            isRecoveringPassword: false
        });
    });

    it('recoverPasswordFail', () => {
        const initialState: LoginState = ApplicationInitialState.login;

        const error = {error: 'error'};
        const newState = loginReducer(initialState, recoverPasswordFail({error}));

        expect(newState).toEqual({
            ...initialState,
            error,
            isRecoveredPassword: false,
            isRecoveringPassword: false
        });
    });

    it('login', () => {
        const initialState: LoginState = ApplicationInitialState.login;

        const newState = loginReducer(initialState, login());

        expect(newState).toEqual({
            ...initialState,
            isLoggedIn: false,
            isLoggingIn: true
        });
    });

    it('loginSuccess', () => {
        const initialState: LoginState = {
            ...ApplicationInitialState.login,
            isLoggingIn: true
        };

        const user = new User();
        user.id = 'anyId';
        const newState = loginReducer(initialState, loginSuccess({user}));

        expect(newState).toEqual({
            ...initialState,
            isLoggedIn: true,
            isLoggingIn: false
        });
    });

    it('loginFail', () => {
        const initialState: LoginState = {
            ...ApplicationInitialState.login,
            isLoggingIn: true
        };

        const error = {error: 'error'};
        const newState = loginReducer(initialState, loginFail({error}));

        expect(newState).toEqual({
            ...initialState,
            error,
            isLoggedIn: false,
            isLoggingIn: false
        });
    });

});

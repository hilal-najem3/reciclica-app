import { LoadingState } from './LoadingState';
import { hide, show } from './loading.actions';
import { createReducer, on } from '@ngrx/store';

const initialState: LoadingState = {
    show: false
};

const reducer = createReducer(
    initialState,
    on(show, () => ({show: true})),
    on(hide, () => ({show: false}))
    );

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function loadingReducer(state: LoadingState, action) {
    return reducer(state, action);
}

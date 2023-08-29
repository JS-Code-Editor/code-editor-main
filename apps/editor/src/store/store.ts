import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { globalReducer, playgroundReducer } from './reducers';
import { initialProjectAPI } from '../services';

const rootReducer = combineReducers({
	globalReducer,
	playgroundReducer,
	[initialProjectAPI.reducerPath]: initialProjectAPI.reducer,
});

export const setupStore = () =>
	configureStore({
		reducer: rootReducer,
		middleware: getDefaultMiddleware =>
			getDefaultMiddleware().concat([initialProjectAPI.middleware]),
	});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { changeLanguage } from 'i18next';
import { IGlobalState } from './types';
import { language, updateLanguage } from './helper';

const initialState: IGlobalState = {
	language: language(),
};

const globalSlice = createSlice({
	name: 'global',
	initialState,
	reducers: {
		changeLanguage: (state, { payload }: PayloadAction<string>) => {
			changeLanguage(payload);
			updateLanguage(payload);
			state.language = payload;
		},
	},
});

const globalReducer = globalSlice.reducer;
const globalActions = globalSlice.actions;

export { globalSlice, globalReducer, globalActions };

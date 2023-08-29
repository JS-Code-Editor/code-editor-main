import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { getEnvVariable } from '../../utils/getEnvVariable';
import { IProjects } from '../../store/reducers/playgroundReducer/types';

const baseUrl = getEnvVariable('BASE_URL');

export const initialProjectAPI = createApi({
	reducerPath: 'initialProjectAPI',
	baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}/work/` }),
	endpoints: builder => ({
		getInitialProject: builder.query<IProjects, void>({
			query: () => {
				return 'initial';
			},
		}),
	}),
});

export const { useLazyGetInitialProjectQuery } = initialProjectAPI;

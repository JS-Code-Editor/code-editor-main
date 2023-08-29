import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { globalSlice } from '../../store/reducers';

import en_EN from './locales/en_EN.json';
import ru_RU from './locales/ru_RU.json';

const resources = {
	en: {
		translation: en_EN,
	},
	ru: {
		translation: ru_RU,
	},
};

i18n
	.use(initReactI18next) // passes i18n down to react-i18next
	.init({
		resources,
		lng: globalSlice.getInitialState().language,

		keySeparator: '.', // we do not use keys in form messages.welcome

		interpolation: {
			escapeValue: false, // react already safes from xss
		},
	});

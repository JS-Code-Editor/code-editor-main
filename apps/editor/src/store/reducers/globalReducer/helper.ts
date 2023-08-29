import {
	DEFAULT_LANGUAGE,
	LS_KEY_LANGUAGE,
} from '../../../utils/constants/constants';

export const updateLanguage = (lang: string) =>
	localStorage.setItem(LS_KEY_LANGUAGE, lang);

export const language = (): string => {
	const localLng = localStorage.getItem(LS_KEY_LANGUAGE);
	if (!localLng) {
		updateLanguage(DEFAULT_LANGUAGE);
	}
	return localStorage.getItem(LS_KEY_LANGUAGE) as string;
};

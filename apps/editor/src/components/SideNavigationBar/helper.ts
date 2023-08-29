import { nanoid } from 'nanoid';

const generateLink = (to: string, emoji: string, text: string) => ({
	id: nanoid(),
	to,
	emoji,
	text,
});

export const generateLinks = (translateFn: (str: string) => string) => {
	return [
		generateLink('/', '🏠', translateFn('SideNavigationBar.home')),
		generateLink('/playground', '📁', translateFn('SideNavigationBar.files')),
		generateLink('/help', '🗂️', translateFn('SideNavigationBar.help')),
		generateLink('/guide', '💡', translateFn('SideNavigationBar.guide')),
		generateLink('/settings', '⚙️', translateFn('SideNavigationBar.settings')),
	];
};

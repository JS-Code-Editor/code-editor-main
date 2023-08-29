import { loader } from '@monaco-editor/react';
import monacoThemes from 'monaco-themes/themes/themelist.json';

// TODO: Needs -> refactor & optimization

export const setTheme = (theme: string): Promise<void> => {
	return new Promise(res => {
		Promise.all([
			loader.init(),
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			import(`monaco-themes/themes/${monacoThemes[theme]}.json`),
		]).then(([monaco, themeData]) => {
			monaco.editor.defineTheme(theme, themeData);
			monaco.editor.setTheme(theme);
			res();
		});
	});
};

import { FC } from 'react';
import classNames from 'classnames';
import { ICreateUrl, IEmojiRender, IEmojiToUnicode } from './types';

import Styles from './EmojiRender.module.scss';
import { getEnvVariable } from '../../utils/getEnvVariable';

const api = getEnvVariable('BASE_URL');

const defaultOptions = {
	protocol: '',
	baseUrl: `/static/emoji/png/`,
	ext: 'png',
};

const filePattern = (fileName: string) => new RegExp(`\\b${fileName}\\b`);

export const EmojiRender: FC<IEmojiRender> = ({ emoji, className, options = defaultOptions }) => {
	const emojiToUnicode: IEmojiToUnicode = em => {
		let comp;
		comp = (em.charCodeAt(0) - 0xd800) * 0x400 + (em.charCodeAt(1) - 0xdc00) + 0x10000;
		if (comp < 0) {
			comp = em.charCodeAt(0);
		}
		return comp.toString(16);
	};

	const getImageSrc = (unicode: string): string | undefined => {
		const imageFiles = require.context(
			'../../../public/static/emoji/png',
			false,
			/\.(png|jpe?g|svg)$/,
		);
		const fileNames = imageFiles.keys();

		for (let i = 0; i < fileNames.length; i++) {
			if (filePattern(unicode).test(fileNames[i])) {
				return imageFiles(fileNames[i]);
			}
		}
	};
	const createUrl: ICreateUrl = (unicode, { baseUrl, ext }) => `${baseUrl}${unicode}.${ext}`;

	return (
		<span className={classNames(Styles.emoji, className)}>
			<img src={getImageSrc(emojiToUnicode(emoji))} alt={emoji} />
		</span>
	);
};

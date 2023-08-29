import { FC } from 'react';
import classNames from 'classnames';
import { ICreateUrl, IEmojiRender, IEmojiToUnicode } from './types';

import Styles from './EmojiRender.module.scss';
import { getEnvVariable } from '../../utils/getEnvVariable';

const api = getEnvVariable('BASE_URL');

const defaultOptions = {
	protocol: '',
	baseUrl: `${api}/static/emoji/png/`,
	ext: 'png',
};

export const EmojiRender: FC<IEmojiRender> = ({ emoji, className, options = defaultOptions }) => {
	const emojiToUnicode: IEmojiToUnicode = em => {
		let comp;
		comp = (em.charCodeAt(0) - 0xd800) * 0x400 + (em.charCodeAt(1) - 0xdc00) + 0x10000;
		if (comp < 0) {
			comp = em.charCodeAt(0);
		}
		return comp.toString(16);
	};
	const createUrl: ICreateUrl = (unicode, { baseUrl, ext }) => `${baseUrl}${unicode}.${ext}`;

	return (
		<span className={classNames(Styles.emoji, className)}>
			<img src={createUrl(emojiToUnicode(emoji), options)} alt={emoji} />
		</span>
	);
};

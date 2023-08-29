import { FC } from 'react';
import classNames from 'classnames';
import { ITypography } from './types';

import Styles from './Typography.module.scss';

export const Typography: FC<ITypography> = ({
	children,
	tag: Tag,
	className,
	style,
	// color = 'dark',
}) => (
	<Tag className={classNames(Styles.typography, /* Styles[color] */ className)} style={style}>
		{children}
	</Tag>
);

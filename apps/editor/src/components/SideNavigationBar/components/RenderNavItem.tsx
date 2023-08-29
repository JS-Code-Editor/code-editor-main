import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { IRenderNavItem } from '../types';
import Styles from '../SideNavigationBar.module.scss';
import { Typography } from '../../Typography';
import { EmojiRender } from '../../EmojiRender';

export const RenderNavItem: FC<IRenderNavItem> = ({ to, label, emoji, includeLabel = false }) => (
	<NavLink
		className={navData => classNames(Styles.navItem, { [Styles.active]: navData.isActive })}
		to={to}
		title={label}
	>
		{includeLabel && (
			<Typography tag='span' className={Styles.name}>
				{label}
			</Typography>
		)}
		<EmojiRender emoji={emoji} />
	</NavLink>
);

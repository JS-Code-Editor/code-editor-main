import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { RenderNavItem } from './components/RenderNavItem';

import Styles from './SideNavigationBar.module.scss';
import { generateLinks } from './helper';

export const SideNavigationBar: FC = () => {
	const { t } = useTranslation();

	return (
		<nav className={Styles.navigationBar}>
			<div className={Styles.mainLinks}>
				{generateLinks(t).map(({ id, to, text, emoji }, idx) => (
					<RenderNavItem key={id} to={to} label={text} emoji={emoji} includeLabel={idx !== 0} />
				))}
			</div>

			<RenderNavItem to='/login' includeLabel label={t('SideNavigationBar.signIn')} emoji='👤' />
		</nav>
	);
};

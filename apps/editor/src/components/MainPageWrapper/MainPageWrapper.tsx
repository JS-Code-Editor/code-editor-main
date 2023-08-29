import { FC } from 'react';
import classNames from 'classnames';

import { IMainPageWrapper } from './types';

import Styles from './MainPageWrapper.module.scss';
import { SideNavigationBar } from '../SideNavigationBar';

export const MainPageWrapper: FC<IMainPageWrapper> = ({
	children,
	className,
}) => (
	<main className={Styles.mainPageWrapper}>
		<SideNavigationBar />
		<main className={classNames(Styles.children, className)}>{children}</main>
	</main>
);

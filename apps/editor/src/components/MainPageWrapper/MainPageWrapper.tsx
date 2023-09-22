import { FC } from 'react';
import classNames from 'classnames';

import { IMainPageWrapper } from './types';

import Styles from './MainPageWrapper.module.scss';
import { SideNavigationBar } from '../SideNavigationBar';

export const MainPageWrapper: FC<IMainPageWrapper> = ({
	children,
	className,
	mouseDownHandler,
	mouseUpHandler,
	mouseMoveHandler,
}) => (
	<main
		className={Styles.mainPageWrapper}
		onMouseDown={mouseDownHandler}
		onMouseUp={mouseUpHandler}
		onMouseMove={mouseMoveHandler}
	>
		<SideNavigationBar />
		<main className={classNames(Styles.children, className)}>{children}</main>
	</main>
);

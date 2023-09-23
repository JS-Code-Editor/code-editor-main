import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import classNames from 'classnames';

import Styles from './MainPageWrapper.module.scss';
import { SideNavigationBar } from '../SideNavigationBar';

export const MainPageWrapper: FC<DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>> = ({
	children,
	className,
	onMouseDown,
	onMouseUp,
	onMouseMove,
}) => (
	<main
		className={Styles.mainPageWrapper}
		onMouseDown={onMouseDown}
		onMouseUp={onMouseUp}
		onMouseMove={onMouseMove}
	>
		<SideNavigationBar />
		<main className={classNames(Styles.children, className)}>{children}</main>
	</main>
);

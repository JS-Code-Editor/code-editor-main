import { FC } from 'react';
import Styles from './Menu.module.scss';
import { IMenuProps } from '../../types';

export const Menu: FC<IMenuProps> = ({ menuItems }) => {
	return (
		<ul className={Styles.menuContainer}>
			{menuItems.map(menuItem => (
				<li onClick={menuItem.handler} key={menuItem.iconName}>
					<i className={`icon-${menuItem.iconName}`} />
				</li>
			))}
		</ul>
	);
};

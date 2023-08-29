import React, { FC } from 'react';
import classNames from 'classnames';
import { IButton } from './types';
import Styles from './Button.module.scss';

const Button: FC<IButton> = ({
	type = 'button',
	onClick,
	children,
	buttonPreview,
	buttonHeight,
	buttonWidth,
	disabled,
	tooltip,
}) => (
	<button
		type={type}
		title={tooltip}
		onClick={onClick}
		disabled={disabled}
		className={classNames(
			Styles.button,
			Styles[buttonPreview],
			Styles[buttonHeight],
			Styles[buttonWidth],
		)}
	>
		{children}
	</button>
);

export default Button;

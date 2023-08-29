import React, { ReactElement, ReactNode } from 'react';

export interface IButton {
	type?: 'button' | 'submit' | 'reset';
	onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	children: ReactNode | ReactElement;
	disabled: boolean;
	tooltip: string;
	buttonWidth: 'x-sm' | 'sm' | 'md' | 'lg' | 'x-lg';
	buttonHeight: 'fat' | 'thin';
	buttonPreview: 'darkGray';
}

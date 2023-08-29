import { CSSProperties, ReactNode } from 'react';

export interface ITypography {
	children: ReactNode;
	className?: string;
	style?: CSSProperties;
	// color?: 'green' | 'white' | 'dark' | 'light-gray' | 'dark-gray';
	tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
}

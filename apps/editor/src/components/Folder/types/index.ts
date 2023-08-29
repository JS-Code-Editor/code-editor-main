import { MouseEvent } from 'react';
import { IProject } from '../../../store/reducers/playgroundReducer/types';

export interface IMenuItem {
	iconName: string;
	handler: (e: MouseEvent<HTMLElement>, args?: any[]) => void;
}

export interface IMenuProps {
	menuItems: IMenuItem[];
}

export interface IFolderProps {
	project: IProject;
	padding: number;
	id: string;
}

export type IHandleClickOnFolder = () => void;
export type IHandleClickOnFile = () => void;

export type ISetFolderFilePaddingStyle = Pick<CSSStyleDeclaration, 'paddingLeft'>;

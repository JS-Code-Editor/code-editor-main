import { MouseEventHandler, PropsWithChildren } from 'react';

export interface IMainPageWrapper extends PropsWithChildren {
	className?: string;
	mouseDownHandler?: MouseEventHandler;
	mouseUpHandler?: MouseEventHandler;
	mouseMoveHandler?: MouseEventHandler;
}

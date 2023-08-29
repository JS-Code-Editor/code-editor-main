import { ChangeEvent, KeyboardEvent } from 'react';

export {};

export type IHandleFileChange = (
	e: ChangeEvent<HTMLTextAreaElement> | KeyboardEvent<HTMLTextAreaElement>,
) => void;

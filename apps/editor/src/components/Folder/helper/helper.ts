import { TREE_INDENTATION } from '../../../utils/constants/constants';
import { ISetFolderFilePaddingStyle } from '../types';

export const setFolderPaddingStyle = (padding: number): ISetFolderFilePaddingStyle => ({
	paddingLeft: `${padding - TREE_INDENTATION}rem`,
});

export const setFilePaddingStyle = (padding: number): ISetFolderFilePaddingStyle => ({
	paddingLeft: `${padding}rem`,
});

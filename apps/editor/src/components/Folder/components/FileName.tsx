import { FC, MouseEvent, useState } from 'react';
import classNames from 'classnames';
import { IFile } from 'store/reducers/playgroundReducer/types';
import { IHandleClickOnFile } from '../types';
import { Menu } from './Menu';
import { setFilePaddingStyle } from '../helper/helper';

import Styles from '../Folder.module.scss';
import { useAppDispatch } from '../../../hooks';
import { playgroundActions } from '../../../store/reducers';

export const FileName: FC<{
	file: IFile;
	padding: number;
	onDoubleClick: IHandleClickOnFile;
}> = ({ file, padding, onDoubleClick }) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const dispatch = useAppDispatch();

	const deleteFile = () => {
		dispatch(
			playgroundActions.deleteFile({
				fileId: file.id,
			}),
		);
	};

	const editFile = () => {
		const newFileName = window.prompt('Edit file name', file.name);
		if (newFileName) {
			dispatch(
				playgroundActions.editFileName({
					newFilename: newFileName,
					fileId: file.id,
				}),
			);
		}
	};

	return (
		<li
			onDoubleClick={onDoubleClick}
			onClick={(e: MouseEvent<HTMLLIElement>) => e.stopPropagation()}
			style={setFilePaddingStyle(padding)}
			className={Styles.file}
			onMouseEnter={() => {
				setIsMenuOpen(true);
			}}
			onMouseLeave={() => {
				setIsMenuOpen(false);
			}}
		>
			<div className={classNames(Styles.fileName, 'truncate')}>
				<i className={classNames(Styles.iconFile, 'icon-file')} />
				<span className='truncate'>{file.name}</span>
			</div>

			{isMenuOpen && (
				<Menu
					menuItems={[
						{
							iconName: 'edit',
							handler: e => {
								e.stopPropagation();
								editFile();
							},
						},
						{
							iconName: 'delete',
							handler: e => {
								e.stopPropagation();
								deleteFile();
							},
						},
					]}
				/>
			)}
		</li>
	);
};

import React, { FC, MouseEvent, useState } from 'react';
import classNames from 'classnames';
import { IFile } from 'store/reducers/playgroundReducer/types';
import { IHandleClickOnFile } from '../types';
import { Menu } from './Menu';
import { setFilePaddingStyle } from '../helper/helper';

import Styles from '../Folder.module.scss';
import { useAppDispatch } from '../../../hooks';
import { playgroundActions } from '../../../store/reducers';
import { EditForm } from '../../EditForm';

export const FileName: FC<{
	file: IFile;
	padding: number;
	onDoubleClick: IHandleClickOnFile;
}> = ({ file, padding, onDoubleClick }) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [newFileName, setNewFileName] = useState(file.name);
	const dispatch = useAppDispatch();

	const deleteFile = () => {
		dispatch(
			playgroundActions.deleteFile({
				fileId: file.id,
			}),
		);
	};

	const initEditFile = () => {
		setIsEditing(true);
	};

	const editFile = () => {
		if (newFileName) {
			dispatch(
				playgroundActions.editFileName({
					newFilename: newFileName,
					fileId: file.id,
				}),
			);

			setIsEditing(false);
		}
	};

	return (
		<li
			onBlur={editFile}
			onDoubleClick={onDoubleClick}
			onClick={(e: MouseEvent<HTMLLIElement>) => e.stopPropagation()}
			style={setFilePaddingStyle(padding)}
			className={classNames(Styles.file, { [Styles.editing]: isEditing })}
			onMouseEnter={() => {
				setIsMenuOpen(true);
			}}
			onMouseLeave={() => {
				setIsMenuOpen(false);
			}}
		>
			<div className={classNames(Styles.fileName, 'truncate')}>
				<i className={classNames(Styles.iconFile, 'icon-file')} />
				{isEditing ? (
					<EditForm
						onSubmit={e => {
							e.preventDefault();
							editFile();
						}}
						value={newFileName}
						onChange={e => setNewFileName(e.target.value)}
					/>
				) : (
					<span className='truncate'>{file.name}</span>
				)}
			</div>

			{isMenuOpen && !isEditing && (
				<Menu
					menuItems={[
						{
							iconName: 'edit',
							handler: e => {
								e.stopPropagation();
								initEditFile();
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

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
	const [isEditing, setIsEditing] = useState(false);
	const [editFileName, setEditFileName] = useState(file.name);
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
		if (editFileName) {
			dispatch(
				playgroundActions.editFileName({
					newFilename: editFileName,
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
			className={classNames(Styles.file, isEditing && Styles.editing)}
			onMouseEnter={() => {
				setIsMenuOpen(true);
			}}
			onMouseLeave={() => {
				setIsMenuOpen(false);
			}}
		>
			<div className={classNames(Styles.fileName, 'truncate')}>
				<i className={classNames(Styles.iconFile, 'icon-file')} />
				{!isEditing && <span className='truncate'>{file.name}</span>}
				{isEditing && (
					<form
						className={classNames(Styles.editForm)}
						onSubmit={e => {
							e.preventDefault();
							editFile();
						}}
					>
						<input value={editFileName} onChange={e => setEditFileName(e.target.value)} autoFocus />
					</form>
				)}
			</div>

			{isMenuOpen && !isEditing && (
				<Menu
					menuItems={[
						{
							iconName: 'edit',
							handler: e => {
								e.stopPropagation();
								isEditing ? editFile() : initEditFile();
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

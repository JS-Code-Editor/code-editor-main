import React, { FC, useState } from 'react';
import classNames from 'classnames';
import { Menu } from './Menu';
import { setFolderPaddingStyle } from '../helper/helper';
import { IHandleClickOnFolder } from '../types';
import Styles from '../Folder.module.scss';
import { EditForm } from '../../EditForm';

export const FolderName: FC<{
	folderName: string;
	expanded: boolean;
	padding: number;
	clickHandler: IHandleClickOnFolder;
	onAddFolder: () => void;
	onAddFile: () => void;
	onDeleteFolder: () => void;
	onEditFolder: (newFolderName: string) => void;
}> = ({
	folderName,
	expanded,
	padding,
	clickHandler,
	onAddFile,
	onAddFolder,
	onDeleteFolder,
	onEditFolder,
}) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [newFolderName, setNewFolderName] = useState(folderName);

	const initEditFolder = () => {
		setIsEditing(true);
	};

	const editFolder = () => {
		onEditFolder(newFolderName);
		setIsEditing(false);
	};

	return (
		<div
			onBlur={editFolder}
			className={classNames(Styles.folder, { [Styles.editing]: isEditing })}
			style={setFolderPaddingStyle(padding)}
			onClick={() => {
				clickHandler();
			}}
			onMouseEnter={() => setIsMenuOpen(true)}
			onMouseLeave={() => setIsMenuOpen(false)}
		>
			<div className={classNames(Styles.folderName, 'truncate')}>
				<span>
					<i
						className={classNames(
							Styles.iconExpandFolder,
							{ [Styles.opened]: expanded },
							'icon-expand-folder',
						)}
					/>
				</span>
				<span>
					<i className={classNames(Styles.iconFolder, 'icon-folder')} />
				</span>
				{isEditing ? (
					<EditForm
						onSubmit={e => {
							e.preventDefault();
							editFolder();
						}}
						value={newFolderName}
						onChange={e => setNewFolderName(e.target.value)}
					/>
				) : (
					<span className='truncate'>{folderName}</span>
				)}
			</div>
			{isMenuOpen && !isEditing && (
				<Menu
					menuItems={[
						{
							iconName: 'edit',
							handler: e => {
								e.stopPropagation();
								initEditFolder();
							},
						},
						{
							iconName: 'add-file',
							handler: e => {
								e.stopPropagation();
								onAddFile();
							},
						},
						{
							iconName: 'add-folder',
							handler: e => {
								e.stopPropagation();
								onAddFolder();
							},
						},
						{
							iconName: 'delete',
							handler: e => {
								e.stopPropagation();
								onDeleteFolder();
							},
						},
					]}
				/>
			)}
		</div>
	);
};

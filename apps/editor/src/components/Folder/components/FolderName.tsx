import { FC, useState } from 'react';
import classNames from 'classnames';
import { Menu } from './Menu';
import { setFolderPaddingStyle } from '../helper/helper';
import { IHandleClickOnFolder } from '../types';
import Styles from '../Folder.module.scss';

export const FolderName: FC<{
	folderName: string;
	expanded: boolean;
	padding: number;
	clickHandler: IHandleClickOnFolder;
	onAddFolder: () => void;
	onAddFile: () => void;
	onDeleteFolder: () => void;
	onEditFolder: (editFolderName: string) => void;
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
	const [editFolderName, setEditFolderName] = useState(folderName);

	const initEditFolder = () => {
		setIsEditing(true);
	};

	const editFolder = () => {
		onEditFolder(editFolderName);
		setIsEditing(false);
	};

	return (
		<div
			onBlur={editFolder}
			className={classNames(Styles.folder, isEditing && Styles.editing)}
			style={setFolderPaddingStyle(padding)}
			onClick={() => {
				!isEditing && clickHandler();
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
				{!isEditing && <span className='truncate'>{folderName}</span>}
				{isEditing && (
					<form
						className={classNames(Styles.editForm)}
						onSubmit={e => {
							e.preventDefault();
							editFolder();
						}}
					>
						<input
							value={editFolderName}
							onChange={e => setEditFolderName(e.target.value)}
							autoFocus
						/>
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

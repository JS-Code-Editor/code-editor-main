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
	onEditFolder: () => void;
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

	return (
		<div
			className={Styles.folder}
			style={setFolderPaddingStyle(padding)}
			onClick={() => clickHandler()}
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
				<span className='truncate'>{folderName}</span>
			</div>
			{isMenuOpen && (
				<Menu
					menuItems={[
						{
							iconName: 'edit',
							handler: e => {
								e.stopPropagation();
								onEditFolder();
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

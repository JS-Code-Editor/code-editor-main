import { FC } from 'react';
import { IFolderProps } from './types';
import { useAppDispatch } from '../../hooks';
import { playgroundActions } from '../../store/reducers';
import { FileName } from './components/FileName';
import { FolderName } from './components/FolderName';
import { TREE_INDENTATION } from '../../utils/constants/constants';
import Styles from './Folder.module.scss';

export const Folder: FC<IFolderProps> = ({ project, padding, id }) => {
	const { name, expanded, childrenFolders, files } = project.folders[id];
	const dispatch = useAppDispatch();

	const addFile = () => {
		const fileName = window.prompt('Enter a file name');
		if (fileName) {
			dispatch(
				playgroundActions.addFile({
					name: fileName,
					parentFolderId: id,
				}),
			);
		}
	};

	const editFolder = () => {
		const newFolderName = window.prompt('Edit folder name', name as string);
		if (newFolderName) {
			dispatch(
				playgroundActions.editFolderName({
					newFolderName: newFolderName,
					folderId: id,
				}),
			);
		}
	};

	const addFolder = () => {
		const folderName = window.prompt('Enter a folder name');
		if (folderName) {
			dispatch(
				playgroundActions.addFolder({
					name: folderName,
					parentFolderId: id,
				}),
			);
		}
	};

	const deleteFolder = () => {
		dispatch(
			playgroundActions.deleteFolder({
				folderId: id,
			}),
		);
	};

	return (
		<>
			{name && (
				<FolderName
					folderName={name}
					expanded={expanded}
					padding={padding}
					onAddFile={addFile}
					onAddFolder={addFolder}
					onDeleteFolder={deleteFolder}
					onEditFolder={editFolder}
					clickHandler={() =>
						dispatch(
							playgroundActions.toggleExpand({
								folderId: id,
							}),
						)
					}
				/>
			)}
			{expanded && (
				<ul className={Styles.folderTree}>
					{childrenFolders.map(child => (
						<li key={child}>
							<Folder id={child} project={project} padding={TREE_INDENTATION + padding} />
						</li>
					))}
					{files.map(fileId => (
						<FileName
							file={project.files[fileId]}
							padding={padding}
							key={fileId}
							onDoubleClick={() => dispatch(playgroundActions.addSelectedFile(fileId))}
						/>
					))}
				</ul>
			)}
		</>
	);
};

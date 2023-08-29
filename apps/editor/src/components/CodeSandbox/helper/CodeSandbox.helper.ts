import {
	IFolder,
	IProject,
} from '../../../store/reducers/playgroundReducer/types';

export interface ITransformedFile {
	content: string;
	path: string;
}

export const transformProjectFiles = (project: IProject) => {
	const { rootFolder: rootFolderId } = project;
	const rootFolder = project.folders[rootFolderId];

	const files: ITransformedFile[] = [];

	const traverseFolders = (path: string, folder: IFolder) => {
		folder.files.forEach(fileId => {
			const fileItem = project.files[fileId];
			files.push({
				path: `${path + fileItem.name}/`,
				content: fileItem.content,
			});
		});
		folder.childrenFolders.forEach(folderId => {
			const folderItem = project.folders[folderId];
			traverseFolders(`${path + folderItem.name}/`, folderItem);
		});
	};

	traverseFolders('./', rootFolder);
	return files;
};

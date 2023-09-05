import { useAppDispatch, useAppSelector } from '../../../hooks';
import { playgroundActions } from '../../../store/reducers';
import { useEffect } from 'react';
import { initialProjectData } from '../../../utils/constants/initialProject';
import { IProject } from '../../../store/reducers/playgroundReducer/types';

export const usePlayground = () => {
	const dispatch = useAppDispatch();
	const { projects, selectedFiles, activeProject } = useAppSelector(s => s.playgroundReducer);

	const initialProject = activeProject && projects[activeProject];
	const activeFile = selectedFiles.find(file => file.isActive);

	useEffect(() => {
		dispatch(playgroundActions.setInitialProject(initialProjectData));
	}, []);

	// Open index.html when playground is loaded
	useEffect(() => {
		if (!activeProject) return;
		const indexHtmlFileId = Object.values(projects[activeProject].files).find(
			file => file.name === 'index.html',
		);
		if (indexHtmlFileId) {
			dispatch(playgroundActions.addSelectedFile(indexHtmlFileId.id));
		}
	}, [initialProject]);

	const menuItems = [
		{
			iconName: 'add-file',
			handler: () => {
				const fileName = window.prompt('Enter a file name');
				if (fileName) {
					dispatch(
						playgroundActions.addFile({
							name: fileName,
							parentFolderId: (initialProject as IProject).rootFolder,
						}),
					);
				}
			},
		},
		{
			iconName: 'add-folder',
			handler: () => {
				const folderName = window.prompt('Enter a folder name');
				if (folderName) {
					dispatch(
						playgroundActions.addFolder({
							name: folderName,
							parentFolderId: (initialProject as IProject).rootFolder,
						}),
					);
				}
			},
		},
	];

	return {
		initialProject,
		menuItems,
		activeFile,
	};
};

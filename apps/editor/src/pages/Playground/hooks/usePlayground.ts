import { useAppDispatch, useAppSelector } from '../../../hooks';
import { useLazyGetInitialProjectQuery } from '../../../services';
import { playgroundActions } from '../../../store/reducers';

export const usePlayground = () => {
	const dispatch = useAppDispatch();
	const { projects, selectedFiles } = useAppSelector(s => s.playgroundReducer);

	const [loadInitialProject, { data, isSuccess }] = useLazyGetInitialProjectQuery();

	const initialProject = projects[Object.keys(projects)[0]]; // maybe projects[activeProject] ???
	const activeFile = selectedFiles.find(file => file.isActive);

	const menuItems = [
		{
			iconName: 'add-file',
			handler: () => {
				const fileName = window.prompt('Enter a file name');
				if (fileName) {
					dispatch(
						playgroundActions.addFile({
							name: fileName,
							parentFolderId: initialProject.rootFolder,
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
							parentFolderId: initialProject.rootFolder,
						}),
					);
				}
			},
		},
	];

	return {
		initialProject,
		loadInitialProject,
		isSuccess,
		data,
		menuItems,
		activeFile,
	};
};

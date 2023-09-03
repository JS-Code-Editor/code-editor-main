import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { IFile, IFolder, IPlaygroundSlice, IProjects } from './types';

const initialState: IPlaygroundSlice = {
	projects: {},
	selectedFiles: [],
	activeProject: null,
};

const playgroundSlice = createSlice({
	name: 'playground',
	initialState,
	reducers: {
		setInitialProject: (state, { payload: projects }: PayloadAction<IProjects>) => {
			const projectIds = Object.keys(projects);
			state.projects[projectIds[0]] = projects[projectIds[0]];
			state.activeProject = projectIds[0];
		},
		addFile: (
			state,
			{
				payload: { name: fileName, parentFolderId },
			}: PayloadAction<{
				name: string;
				parentFolderId: string;
			}>,
		) => {
			const newFile: IFile = {
				id: nanoid(),
				content: '',
				name: fileName,
				parentFolder: parentFolderId,
			};
			const currentProject = state.projects[state.activeProject as string];

			currentProject.files[newFile.id] = newFile;
			currentProject.folders[parentFolderId].files.push(newFile.id);
		},
		deleteFile: (state, { payload: { fileId } }: PayloadAction<{ fileId: string }>) => {
			const currentProject = state.projects[state.activeProject as string];
			const currentFile = currentProject.files[fileId];
			const currentFolder = currentProject.folders[currentFile.parentFolder];
			currentFolder.files = currentFolder.files.filter(childId => childId !== fileId);
			delete currentProject.files[fileId];
			state.selectedFiles = state.selectedFiles.filter(selFile => selFile.id !== fileId);
		},

		addFolder: (
			state,
			{
				payload: { name: folderName, parentFolderId },
			}: PayloadAction<{
				name: string;
				parentFolderId: string;
			}>,
		) => {
			const newFolder: IFolder = {
				id: nanoid(),
				name: folderName,
				files: [],
				childrenFolders: [],
				parentFolder: parentFolderId,
				expanded: false,
			};
			const currentProject = state.projects[state.activeProject as string];

			currentProject.folders[newFolder.id] = newFolder;
			currentProject.folders[parentFolderId].childrenFolders.push(newFolder.id);
		},
		deleteFolder: (
			state,
			{
				payload: { folderId },
			}: PayloadAction<{
				folderId: string;
			}>,
		) => {
			const currentProject = state.projects[state.activeProject as string];

			const deleteRecursively = (folId: string) => {
				const folder = currentProject.folders[folId];
				const parent = currentProject.folders[folder.parentFolder];
				if (folder.childrenFolders.length === 0) {
					folder.files.forEach(fileId => {
						delete currentProject.files[fileId];
					});
					parent.childrenFolders = parent.childrenFolders.filter(f => {
						return f !== folId;
					});
					delete currentProject.folders[folder.id];
					return;
				}
				folder.childrenFolders.forEach(childFolId => {
					deleteRecursively(childFolId);
				});
				deleteRecursively(folId);
			};

			deleteRecursively(folderId);
		},
		toggleExpand: (
			state,
			{
				payload: { folderId },
			}: PayloadAction<{
				folderId: string;
			}>,
		) => {
			const expandedValue =
				state.projects[state.activeProject as string].folders[folderId].expanded;
			state.projects[state.activeProject as string].folders[folderId].expanded = !expandedValue;
		},
		addSelectedFile: (state, { payload }: PayloadAction<string>) => {
			const exists = state.selectedFiles.find(selected => selected.id === payload);

			state.selectedFiles.forEach(selected => {
				if (selected.isActive) {
					selected.isActive = false;
				}
			});

			if (!exists) {
				state.selectedFiles.push({
					id: payload,
					isActive: true,
				});
			} else {
				exists.isActive = true;
			}
		},
		editFolderName: (
			state,
			{
				payload: { folderId, newFolderName },
			}: PayloadAction<{ folderId: string; newFolderName: string }>,
		) => {
			const currentFolder = state.projects[state.activeProject as string].folders[folderId];
			currentFolder.name = newFolderName;
		},
		editFileName: (
			state,
			{ payload: { fileId, newFilename } }: PayloadAction<{ fileId: string; newFilename: string }>,
		) => {
			const currentFile = state.projects[state.activeProject as string].files[fileId];
			currentFile.name = newFilename;
		},
		removeSelectedFile: (state, { payload }: PayloadAction<string>) => {
			const target = state.selectedFiles.findIndex(selected => selected.id === payload);

			if (target > -1) {
				state.selectedFiles.splice(target, 1);
			}
		},

		updateFileContent: (
			state,
			{ payload }: PayloadAction<{ fileId: string; newContent: string }>,
		) => {
			state.projects[state.activeProject as string].files[payload.fileId].content =
				payload.newContent;
		},
	},
});

const playgroundReducer = playgroundSlice.reducer;
const playgroundActions = playgroundSlice.actions;

export { playgroundSlice, playgroundReducer, playgroundActions };

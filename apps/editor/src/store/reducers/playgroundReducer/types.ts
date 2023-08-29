export interface IFile {
	name: string;
	content: string;
	id: string;
	parentFolder: string;
}
export type IFiles = Record<string, IFile>;

export interface IFolder {
	name: string | null;
	files: string[];
	childrenFolders: string[];
	expanded: boolean;
	id: string;
	parentFolder: string;
}
export type IFolders = Record<string, IFolder>;

export interface IProject {
	name: string;
	folders: IFolders;
	files: IFiles;
	rootFolder: string;
	id: string;
}
export type IProjects = Record<string, IProject>;

export interface ISelectedFile {
	id: string;
	isActive: boolean;
}

export interface IPlaygroundSlice {
	projects: IProjects;
	selectedFiles: ISelectedFile[];
	activeProject: string;
}

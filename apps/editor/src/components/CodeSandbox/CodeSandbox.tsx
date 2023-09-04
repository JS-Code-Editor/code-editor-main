import { FC, RefObject, useEffect, useMemo } from 'react';
import Editor, { useMonaco } from '@monaco-editor/react';
import { setTheme } from '../../utils/playground/setTheme';

import Styles from './CodeSandbox.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { MONACO_LANGUAGE_MAP } from './helper/languages';
import { playgroundActions } from '../../store/reducers';
import { transformProjectFiles } from './helper/CodeSandbox.helper';

interface ICodeSandboxProps {
	activeFileId?: string;
	iframe: RefObject<HTMLIFrameElement>;
	isPreviewLoaded: boolean;
}

export const CodeSandbox: FC<ICodeSandboxProps> = ({ activeFileId, iframe, isPreviewLoaded }) => {
	const monaco = useMonaco();
	const { projects, activeProject } = useAppSelector(s => s.playgroundReducer);

	const dispatch = useAppDispatch();

	const file = activeProject && activeFileId && projects[activeProject].files[activeFileId];

	useEffect(() => {
		if (monaco) {
			// TODO: we need to remove/stop the request in unmounting of component to avoid memory leak
			setTheme('merbivore-soft');
		}
	}, [monaco]);

	useEffect(() => {
		const currentProject = projects[activeProject as string];
		if (currentProject && isPreviewLoaded) {
			const transformedFiles = transformProjectFiles(currentProject);
			console.log(transformedFiles);
			iframe.current?.contentWindow?.postMessage(
				{
					files: transformedFiles,
					entryFilePath: './index.js/',
				},
				'*',
			);
		}
	}, [file, isPreviewLoaded]);

	const language = useMemo(() => {
		if (file) {
			if (file.name.lastIndexOf('.') === -1) return undefined;
			const ext = file.name.slice(file.name.lastIndexOf('.') + 1);

			return MONACO_LANGUAGE_MAP[ext];
		}
	}, [file]);

	return (
		<div className={Styles.editorContainer} style={{ visibility: file ? 'visible' : 'hidden' }}>
			<Editor
				width='100%'
				height='100%'
				options={{
					fontSize: 14,
				}}
				className={Styles.monacoEditor}
				language={language}
				onMount={() => console.log('Editor is mounted')}
				value={file ? file.content : ''}
				path={activeFileId}
				onChange={e => {
					if (e && file) {
						dispatch(
							playgroundActions.updateFileContent({
								fileId: activeFileId,
								newContent: e,
							}),
						);
					}
				}}
			/>
		</div>
	);
};

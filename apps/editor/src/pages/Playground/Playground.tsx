import { MouseEvent, useEffect, useRef, useState } from 'react';
import { CodeSandbox, FileNavigation, Folder, MainPageWrapper, Menu } from '../../components';
import { TREE_INDENTATION } from '../../utils/constants/constants';
import { usePlayground } from './hooks/usePlayground';

import Styles from './Playground.module.scss';
import { getEnvVariable } from '../../utils/getEnvVariable';
import { Console } from 'console-feed';

const previewUrl = getEnvVariable('PREVIEW_URL');

export const Playground = () => {
	const previewFrame = useRef<HTMLIFrameElement>(null);
	const [previewLoaded, setPreviewLoaded] = useState(false);
	const consoleRef = useRef<HTMLDivElement>(null);

	const [folderStructureWidth, setFolderStructureWidth] = useState(300);
	const [isResizing, setIsResizing] = useState(false);

	const [logs, setLogs] = useState<any[]>([]);

	useEffect(() => {
		const handleMessage = (event: MessageEvent) => {
			if (event.origin !== previewUrl) return;
			if (event.data.type === 'LOG' || event.data.type === 'ERROR') {
				setLogs(logs => [...logs, event.data.log]);
			}
		};

		window.addEventListener('message', handleMessage);

		return () => {
			window.removeEventListener('message', handleMessage);
		};
	}, []);

	const { initialProject, menuItems, activeFile } = usePlayground();

	useEffect(() => {
		if (consoleRef.current) {
			consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
		}
	}, [logs]);

	const handleResize = (event: MouseEvent<HTMLDivElement>) => {
		if (isResizing) {
			setFolderStructureWidth(prev => prev + event.movementX);
		}
	};

	return (
		<MainPageWrapper
			mouseDownHandler={event => {
				if ((event.target as Element).id === 'resizer') {
					setIsResizing(true);
				}
			}}
			mouseUpHandler={() => setIsResizing(false)}
			mouseMoveHandler={handleResize}
			className={Styles.playgroundContainer}
		>
			<section className={Styles.folderStructure} style={{ width: `${folderStructureWidth}px` }}>
				<Menu menuItems={menuItems} />
				{initialProject && (
					<Folder
						id={initialProject.rootFolder}
						project={initialProject}
						padding={TREE_INDENTATION}
					/>
				)}
				<div id='resizer' className={Styles.resizer}></div>
			</section>
			<section
				className={Styles.playground}
				style={{ width: `calc(100% - ${folderStructureWidth}px)` }}
			>
				<FileNavigation />
				<div className={Styles.editContainer}>
					<CodeSandbox
						activeFileId={activeFile?.id}
						iframe={previewFrame}
						isPreviewLoaded={previewLoaded}
					/>
					<div className={Styles.previewContainer}>
						<iframe
							className={Styles.iframe}
							src={previewUrl}
							title='Code Editor Preview'
							id='preview'
							ref={previewFrame}
							onLoad={() => setPreviewLoaded(true)}
						/>
						<div className={Styles.consoleWrapper} ref={consoleRef}>
							<Console logs={logs} variant='dark' />
						</div>
					</div>
				</div>
			</section>
		</MainPageWrapper>
	);
};

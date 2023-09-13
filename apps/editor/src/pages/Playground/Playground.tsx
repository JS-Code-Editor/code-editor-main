import { useEffect, useRef, useState } from 'react';
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

	return (
		<MainPageWrapper className={Styles.playgroundContainer}>
			<section className={Styles.folderStructure}>
				<Menu menuItems={menuItems} />
				{initialProject && (
					<Folder
						id={initialProject.rootFolder}
						project={initialProject}
						padding={TREE_INDENTATION}
					/>
				)}
			</section>
			<section className={Styles.playground}>
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

import { useRef } from 'react';
import { CodeSandbox, FileNavigation, Folder, MainPageWrapper, Menu } from '../../components';
import { TREE_INDENTATION } from '../../utils/constants/constants';
import { usePlayground } from './hooks/usePlayground';

import Styles from './Playground.module.scss';

export const Playground = () => {
	const previewFrame = useRef<HTMLIFrameElement>(null);

	const { initialProject, menuItems, activeFile } = usePlayground();

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
				<div style={{ height: 'calc(100% - 3.5rem)', display: 'flex' }}>
					<CodeSandbox activeFileId={activeFile?.id} iframe={previewFrame} />
					<iframe
						style={{ width: '40%', border: 'none', backgroundColor: '#fff' }}
						src='http://localhost:1234/'
						title='Code Editor Preview'
						id='preview'
						ref={previewFrame}
					/>
				</div>
			</section>
		</MainPageWrapper>
	);
};

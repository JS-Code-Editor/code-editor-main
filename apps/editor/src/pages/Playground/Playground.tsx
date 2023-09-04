import { useRef, useState } from 'react';
import { CodeSandbox, FileNavigation, Folder, MainPageWrapper, Menu } from '../../components';
import { TREE_INDENTATION } from '../../utils/constants/constants';
import { usePlayground } from './hooks/usePlayground';

import Styles from './Playground.module.scss';
import { getEnvVariable } from '../../utils/getEnvVariable';

const previewUrl = getEnvVariable('PREVIEW_URL');
console.log(previewUrl);

export const Playground = () => {
	const previewFrame = useRef<HTMLIFrameElement>(null);
	const [previewLoaded, setPreviewLoaded] = useState(false);

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
					<CodeSandbox
						activeFileId={activeFile?.id}
						iframe={previewFrame}
						isPreviewLoaded={previewLoaded}
					/>
					<iframe
						style={{ width: '40%', border: 'none', backgroundColor: '#fff' }}
						src={previewUrl}
						title='Code Editor Preview'
						id='preview'
						ref={previewFrame}
						onLoad={() => setPreviewLoaded(true)}
					/>
				</div>
			</section>
		</MainPageWrapper>
	);
};

import { FC } from 'react';
import { useAppSelector, useAppDispatch } from 'hooks';
import classNames from 'classnames';
import Styles from './FileNavigation.module.scss';
import { playgroundActions } from '../../store/reducers';

export const FileNavigation: FC = () => {
	const { selectedFiles } = useAppSelector(s => s.playgroundReducer);
	const { projects } = useAppSelector(s => s.playgroundReducer);
	const dispatch = useAppDispatch();

	const currentProject = Object.keys(projects)[0];

	return (
		<nav className={Styles.fileNavContainer}>
			{selectedFiles.map(file => (
				<button
					type='button'
					className={classNames({ [Styles.active]: file.isActive })}
					key={file.id}
					onClick={() => dispatch(playgroundActions.addSelectedFile(file.id))}
				>
					<span>{projects[currentProject].files[file.id].name}</span>
					<span className={Styles.exitIcon}>
						<i
							className='icon-exit'
							onClick={e => {
								e.stopPropagation();
								dispatch(playgroundActions.removeSelectedFile(file.id));
							}}
						/>
					</span>
				</button>
			))}
		</nav>
	);
};

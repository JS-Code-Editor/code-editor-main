import { FC } from 'react';
import Styles from './Home.module.scss';
import { Header } from './components/header';
import { ScrollObserver } from '../../contexts/scrollObserver';

export const Home: FC = () => {
	return (
		<main className={Styles.home}>
			<ScrollObserver>
				<Header />
			</ScrollObserver>
			<div
				style={{
					position: 'relative',
					width: '100%',
					minHeight: '100vh',
					backgroundColor: 'white',
					zIndex: 4,
					color: '#C4CBCC',
					fontSize: '84px',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				we will launch soon...
			</div>
		</main>
	);
};

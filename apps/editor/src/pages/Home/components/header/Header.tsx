import { useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Typography } from '../../../../components';
import Button from '../../../../components/Button/Button';
import { ScrollContext } from '../../../../contexts/scrollObserver';
import logoSVG from '../../../../assets/logotype.svg';

import Styles from './Header.module.scss';

export const Header = () => {
	const refContainer = useRef<HTMLDivElement>(null);
	const { scrollY } = useContext(ScrollContext);

	const { current: elContainer } = refContainer;

	let progress = 0;

	if (elContainer) {
		progress = Math.min(1, scrollY / elContainer.clientHeight);
	}

	const fideContentOnScroll = 1 - Number(progress.toFixed(2)) * 1.25;

	const contentStyle = {
		transform: `translateY(-${progress * 30}vh)`,
		opacity: fideContentOnScroll,
	};

	return (
		<header
			ref={refContainer}
			style={contentStyle}
			className={classNames(Styles.header, 'container')}
		>
			<div className={Styles.logotype}>
				<img src={logoSVG} alt='logotype: Javascript' />
				<span className={Styles.backgroundBlurryShadow_1} />
				<span className={Styles.backgroundBlurryShadow_2} />
			</div>

			<div className={Styles.descriptions}>
				<Typography tag='p'>Javascript code editor</Typography>

				<Typography tag='h1'>
					A lightweight editor with <br /> multifunctional features. Open source.
				</Typography>

				<Typography tag='span'>
					Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
					been the industries standard dummy text ever since the 1500s, when an unknown printer took
					a galley of type and scrambled it to make a type specimen book.
				</Typography>
			</div>

			<div className={Styles.button}>
				<Link to='/playground'>
					<Button
						buttonPreview='darkGray'
						buttonHeight='fat'
						buttonWidth='x-lg'
						disabled={false}
						tooltip='some'
					>
						Open code editor
					</Button>
				</Link>
			</div>

			<div className={Styles.version}>
				<Typography tag='span'>v0.0.1</Typography>
			</div>
		</header>
	);
};

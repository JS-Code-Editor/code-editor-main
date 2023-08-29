import { FC } from 'react';

import Styles from './BlurryAnimatedShadow.module.scss';

interface IBlurryAnimatedShadow {
	width: string;
	height: string;
}

export const BlurryAnimatedShadow: FC<IBlurryAnimatedShadow> = ({
	width,
	height,
}) => {
	return (
		<div
			className={Styles.container}
			style={{
				width,
				height,
			}}
		>
			<span className={Styles.firstCircle} />
			<span className={Styles.secondCircle} />
			<span className={Styles.thirdCircle} />
		</div>
	);
};

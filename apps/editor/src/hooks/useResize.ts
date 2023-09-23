import { useEffect, useState } from 'react';

export const useResize = (
	initialSize: number,
	limitation: number,
): [boolean, number, () => void, () => void, (size: number) => void] => {
	const [isShown, setIsShown] = useState(true);
	const [isResizing, setIsResizing] = useState(false);
	const [size, setSize] = useState(initialSize);

	useEffect(() => {
		if (size < limitation) {
			setIsShown(false);
		} else {
			setIsShown(true);
		}
	}, [size]);

	const resizeBegin = () => setIsResizing(true);
	const resizeEnd = () => setIsResizing(false);

	const resize = (size: number) => {
		isResizing && setSize(prev => prev + size);
	};

	return [isShown, size, resizeBegin, resizeEnd, resize];
};

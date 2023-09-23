import { useState } from 'react';

export const useResize = (
	initialSize: number,
): [number, () => void, () => void, (size: number) => void] => {
	const [isResizing, setIsResizing] = useState(false);
	const [size, setSize] = useState(initialSize);

	const resizeBegin = () => setIsResizing(true);
	const resizeEnd = () => setIsResizing(false);

	const resize = (size: number) => {
		isResizing && setSize(prev => prev + size);
	};

	return [size, resizeBegin, resizeEnd, resize];
};

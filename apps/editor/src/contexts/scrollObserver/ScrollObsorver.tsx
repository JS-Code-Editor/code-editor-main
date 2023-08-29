import { createContext, FC, PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { IScrollValue } from './types';

export const ScrollContext = createContext<IScrollValue>({
	scrollY: 0,
});

export const ScrollObserver: FC<PropsWithChildren> = ({ children }) => {
	const [scrollY, setScrollY] = useState(0);

	const handleScroll = useCallback(() => {
		setScrollY(window.scrollY);
	}, []);

	useEffect(() => {
		window.addEventListener('scroll', handleScroll, { passive: true });

		return () => window.removeEventListener('scroll', handleScroll);
	}, [handleScroll]);

	return <ScrollContext.Provider value={{ scrollY }}>{children}</ScrollContext.Provider>;
};

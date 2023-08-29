import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home, Help, Guide, Settings, Playground } from 'pages';
import { Login } from '../pages/Login';

export const App: FC = () => {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/playground' element={<Playground />} />
			<Route path='/help' element={<Help />} />
			<Route path='/guide' element={<Guide />} />
			<Route path='/settings' element={<Settings />} />
			<Route path='/login' element={<Login />} />
		</Routes>
	);
};

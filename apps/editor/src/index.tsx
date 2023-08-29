import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { App } from 'app';
import { setupStore } from './store/store';

import './utils/i18n/i18n';

import './mainStyles/global.scss';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundarys';

const store = setupStore();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLBaseElement);

root.render(
	<ErrorBoundary>
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	</ErrorBoundary>,
);

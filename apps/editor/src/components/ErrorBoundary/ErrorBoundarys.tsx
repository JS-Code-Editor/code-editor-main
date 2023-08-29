import { Component, PropsWithChildren } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withTranslation } from 'react-i18next';
import { Typography } from 'components';

import Styles from './ErrorBoundary.module.scss';
import { TFunction } from 'i18next';

interface StateProps {
	hasError: boolean;
	errorMessage: string;
}

interface Props extends PropsWithChildren {
	t: TFunction;
}

interface ErrorBoundaryProps {
	state: StateProps;
	props: Props;
}

class ErrorBoundary extends Component {
	state = {
		hasError: false,
		errorMessage: '',
	};

	static propTypes = {
		children: PropTypes.node.isRequired,
	};

	static getDerivedStateFromError(error: { message: string }) {
		return { hasError: true, errorMessage: error.message };
	}

	render() {
		const {
			state: { hasError, errorMessage },
			props: { children, t },
		} = this as unknown as ErrorBoundaryProps;

		if (hasError) {
			return (
				<div className={classNames('container', Styles.errorBoundary)}>
					<Typography tag='p'>{t('ERRORS.somethingWentWrong')}</Typography>
					<Typography tag='span'>
						{t('ERRORS.errorHandledInBoundary')}
					</Typography>
					<code>{errorMessage}</code>
				</div>
			);
		}
		return children;
	}
}

export default withTranslation()(ErrorBoundary);

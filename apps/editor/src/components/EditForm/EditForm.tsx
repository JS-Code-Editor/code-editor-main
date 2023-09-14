import classNames from 'classnames';
import Styles from '../Folder/Folder.module.scss';
import { ChangeEventHandler, FC, FormEventHandler } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

export interface IEditFormProps {
	onSubmit: FormEventHandler<HTMLFormElement>;
	value: string;
	onChange: ChangeEventHandler<HTMLInputElement>;
}
export const EditForm: FC<IEditFormProps> = ({ value, onChange, onSubmit }) => {
	return (
		<form className={classNames(Styles.editForm)} onSubmit={onSubmit}>
			<input value={value} onChange={onChange} autoFocus />
			<button type='submit'>
				<FontAwesomeIcon icon={faCheckCircle} />
			</button>
		</form>
	);
};

import classNames from 'classnames';
import Styles from '../Folder/Folder.module.scss';
import { ChangeEventHandler, FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

export interface IEditFormProps {
	onSaveEdit: () => void;
	onCancelEdit: () => void;
	value: string;
	onChange: ChangeEventHandler<HTMLInputElement>;
}
export const EditForm: FC<IEditFormProps> = ({ value, onChange, onSaveEdit, onCancelEdit }) => {
	return (
		<form
			className={classNames(Styles.editForm)}
			onBlur={onCancelEdit}
			onSubmit={e => {
				e.preventDefault();
				onSaveEdit();
			}}
			onKeyDown={e => {
				if (e.key === 'Escape') {
					onCancelEdit();
				}
			}}
		>
			<input
				value={value}
				onChange={onChange}
				autoFocus
				onClick={e => {
					e.stopPropagation();
				}}
			/>
			<button
				type='submit'
				onClick={e => {
					e.stopPropagation();
				}}
				onMouseDown={e => {
					e.preventDefault();
					onSaveEdit();
				}}
			>
				<FontAwesomeIcon icon={faCheckCircle} />
			</button>
		</form>
	);
};

import classNames from 'classnames';
import Styles from '../Folder/Folder.module.scss';
import { ChangeEventHandler, FC, FormEventHandler } from 'react';

export interface IEditFormProps {
	onSubmit: FormEventHandler<HTMLFormElement>;
	value: string;
	onChange: ChangeEventHandler<HTMLInputElement>;
}
export const EditForm: FC<IEditFormProps> = props => {
	return (
		<form className={classNames(Styles.editForm)} onSubmit={props.onSubmit}>
			<input value={props.value} onChange={props.onChange} autoFocus />
		</form>
	);
};

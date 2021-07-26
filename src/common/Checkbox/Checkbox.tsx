import React from 'react';

import styles from './CheckBox.module.scss';

interface CheckBoxProps {
    id: string;
    checked: boolean;
    handleChangeCheckBox?(): void;
}

export function CheckBox({ id, checked, handleChangeCheckBox }: CheckBoxProps): JSX.Element {
    return (
        <label htmlFor={id}>
            <input
                type="checkbox"
                className={styles.customCheckbox}
                id={id}
                name="checkbox"
                checked={checked}
                onChange={handleChangeCheckBox}
            />
        </label>
    );
}

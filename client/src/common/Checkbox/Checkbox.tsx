import React from 'react';

import classes from './Checkbox.module.scss';

interface CheckBoxProps {
    id: string;
    checked: boolean;
    text: string;
    handleChangeCheckBox(id: string): void;
}

export function Checkbox({ id, checked, text, handleChangeCheckBox }: CheckBoxProps): JSX.Element {
    function toggleCheckbox() {
        handleChangeCheckBox(id);
    }
    return (
        <div className={classes.checkbox__container}>
            <label htmlFor={id} className={classes.checkbox__label}>
                <input
                    type="checkbox"
                    className={classes.customCheckbox}
                    id={id}
                    checked={checked}
                    onChange={toggleCheckbox}
                />
                {text}
            </label>
        </div>
    );
}

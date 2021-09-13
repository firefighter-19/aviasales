import React, { useState } from 'react';
import { Checkbox } from '../../../../common/Checkbox';

import classes from './NavigationBar.module.scss';

export function NavigationBar(): JSX.Element {
    const checkboxes = [
        { id: '1', text: 'Без пересадок', checked: false },
        { id: '2', text: '1 пересадка', checked: false },
        { id: '3', text: '2 пересадки', checked: false },
        { id: '4', text: '3 пересадки', checked: false },
    ];

    const [checkboxToggler, setCheckboxToggler] = useState(checkboxes);

    function handleChangeCheckBox(id: string): void {
        const updateCheckboxes = checkboxToggler.map((checkbox) => {
            if (checkbox.id === id) {
                return { ...checkbox, checked: !checkbox.checked };
            }
            return checkbox;
        });
        setCheckboxToggler(updateCheckboxes);
    }

    // if (id === 'All') {
    //     const checkCheckboxStatus = checkboxToggler.every(
    //         (checkboxStatus) => checkboxStatus.checked,
    //     );
    //     if (checkCheckboxStatus) {
    //         return { ...checkbox, checked: false };
    //     }
    //     return { ...checkbox, checked: true };
    // }

    return (
        <div className={classes.navigationBar}>
            <div className={classes.navigationBar__wrapper}>
                {checkboxToggler.map((checkbox) => (
                    <Checkbox
                        key={checkbox.id}
                        id={checkbox.id}
                        text={checkbox.text}
                        checked={checkbox.checked}
                        handleChangeCheckBox={handleChangeCheckBox}
                    />
                ))}
            </div>
        </div>
    );
}

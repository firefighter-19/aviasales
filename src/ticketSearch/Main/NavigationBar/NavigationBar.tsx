import React, { useEffect, useState } from 'react';
import { Checkbox } from '../../../common/Checkbox';
import { Ticket } from '../../../interfaces';

import classes from './NavigationBar.module.scss';

interface Props {
    sortedByTabTickets: Ticket[];
    updateTicketList(ticketList: Ticket[]): void;
}

export function NavigationBar({ sortedByTabTickets, updateTicketList }: Props): JSX.Element {
    const checkboxes = [
        { id: '1', text: 'Без пересадок', checked: false, stops: 0 },
        { id: '3', text: '1 пересадки', checked: false, stops: 1 },
        { id: '2', text: '2 пересадка', checked: false, stops: 2 },
        { id: '4', text: '3 пересадки', checked: false, stops: 3 },
    ];
    const [allCheckboxToggler, setAllCheckboxToggler] = useState<boolean>(false);
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

    function toggleAllCheckboxes() {
        setAllCheckboxToggler(!allCheckboxToggler);
        const toggledAll = checkboxToggler.map((checkboxItem) => {
            if (!allCheckboxToggler) {
                return { ...checkboxItem, checked: true };
            }
            return { ...checkboxItem, checked: false };
        });
        setCheckboxToggler(toggledAll);
    }

    useEffect(() => {
        const checkToggler = checkboxToggler.every((checkbox) => checkbox.checked);
        if (checkToggler) {
            setAllCheckboxToggler(true);
        } else {
            setAllCheckboxToggler(false);
        }
    }, [checkboxToggler]);

    useEffect(() => {
        const checkToggler = checkboxToggler.some((checkbox) => checkbox.checked);
        if (checkToggler) {
            const sortedTicketsByStops = sortedByTabTickets.filter((ticket) => {
                return ticket.segments.every((segment) => {
                    // Продуктовый вопрос: непонятно, должна ли быть хотя бы одна пересадка в одну сторону или в обе стороны 'some' или 'every'
                    return checkboxToggler.some(
                        (checkbox) => checkbox.checked && checkbox.stops === segment.stops.length,
                    );
                });
            });
            updateTicketList(sortedTicketsByStops);
        } else {
            updateTicketList(sortedByTabTickets);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checkboxToggler]);

    return (
        <div className={classes.navigationBar}>
            <div className={classes.navigationBar__wrapper}>
                <p className={classes.navigationBar__text}>Количество пересадок</p>
                <Checkbox
                    id="All"
                    text="Все"
                    checked={allCheckboxToggler}
                    handleChangeCheckBox={toggleAllCheckboxes}
                />
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

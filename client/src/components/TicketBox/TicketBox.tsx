import React from 'react';
import { Ticket } from '../../interfaces';

import classes from './TicketBox.module.scss';
import { TicketInfo } from './TicketInfo';

interface TicketProps {
    ticket: Ticket;
}

export function TicketBox({ ticket }: TicketProps): JSX.Element {
    const { price, carrier, segments } = ticket;
    return (
        <div className={classes.ticket__container}>
            <div className={classes.ticket__wrapper}>
                <div className={classes.ticket__header}>
                    <div className={classes.ticket__price}>{price}</div>
                    <div className={classes.ticket__carrier}>{carrier}</div>
                </div>
                <div className={classes.ticket__info}>
                    {segments.map((segment) => (
                        <TicketInfo key={segment.date} segment={segment} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export const TicketList = React.memo(TicketBox);

import React from 'react';
import { Ticket } from '../../interfaces';

import classes from './TicketBox.module.scss';

interface TicketProps {
    ticket: Ticket;
}

export function TicketBox({ ticket }: TicketProps): JSX.Element {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { price, carrier, segments } = ticket;
    return (
        <div>
            <div className={classes.ticket__header}>
                <div className={classes.ticket__price}>{price}</div>
                <div className={classes.ticket__carrier}>{carrier}</div>
            </div>
            {/* <div className={classes.ticket__info}>
                {segments.map((segment) => (
                    <div>123</div>
                ))}
            </div> */}
        </div>
    );
}

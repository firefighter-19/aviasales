import React from 'react';
import { Ticket } from '../../../interfaces';

import classes from './TicketInfo.module.scss';

type Segments = Pick<Ticket, 'segments'>;

interface TicketInfoProps {
    segment: Segments;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function TicketInfo({ segment }: TicketInfoProps): JSX.Element {
    return (
        <div className={classes.ticketInfo__segments}>
            <div>Hi</div>
        </div>
    );
}

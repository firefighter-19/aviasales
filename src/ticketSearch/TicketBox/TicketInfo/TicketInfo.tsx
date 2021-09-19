import React from 'react';
import { addMinutes, format } from 'date-fns';
import { Segment } from '../../../interfaces';

import classes from './TicketInfo.module.scss';

interface TicketInfoProps {
    segment: Segment;
}

export function TicketInfo({ segment }: TicketInfoProps): JSX.Element {
    const { stops, origin, date, destination, duration } = segment;
    const destinationTimeDate = addMinutes(new Date(date), duration);

    const chooseCase = stops.length > 1 ? 'Пересадки' : 'Пересадка';

    const stopsView = stops.map((stop) =>
        stop === stops[stops.length - 1] ? `${stop}` : `${stop},`,
    );

    function getTimeFromMins(mins: number) {
        const hours = Math.trunc(mins / 60);
        const minutes = mins % 60;
        return `${hours}ч ${minutes}м`;
    }

    return (
        <div className={classes.ticketInfo__segments}>
            <div className={classes.ticketInfo__timeZone}>
                <div className={classes.ticketInfo__destination}>
                    <div>{origin}</div>&nbsp;-&nbsp;<div>{destination}</div>
                </div>
                <div className={classes.ticketInfo__time}>
                    <div>{format(new Date(date), 'HH:mm')}</div>-
                    <div>{format(new Date(destinationTimeDate), 'HH:mm')}</div>
                </div>
            </div>
            <div className={classes.ticketInfo__duration}>
                <div className={classes.ticketInfo__route}>В пути</div>
                <div className={classes.ticketInfo__routeTime}>{getTimeFromMins(duration)}</div>
            </div>
            <div className={classes.ticketInfo__stopsBlock}>
                <div className={classes.ticketInfo__stopsTitle}>
                    {stops.length ? `${stops.length} ${chooseCase}` : 'Пересадок нет'}
                </div>
                <div className={classes.ticketInfo__stopsMain}>
                    {stopsView.map((stop) => (
                        <div className={classes.ticketInfo__stops} key={stop}>
                            {stop}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

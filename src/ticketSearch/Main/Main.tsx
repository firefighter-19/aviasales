import React, { useEffect, useState } from 'react';
import { useFetch } from '../../hooks';
import { Ticket, TicketId, TicketsTypes } from '../../interfaces';
import { NavigationBar } from './NavigationBar';
import { Tab } from './Tab';

import classes from './Main.module.scss';
import { TicketBox } from '../TicketBox';

export function Main({ searchId }: TicketId): JSX.Element {
    const [sortedByTabTickets, setSortedByTabTickets] = useState<Ticket[]>([]);
    const [sortedByNavbarTickets, setSortedByNavbarTickets] = useState<Ticket[]>([]);
    const [chosenTabId, setChosenTabId] = useState<string>('1');
    const { data, error } = useFetch<TicketsTypes>({
        url: `https://front-test.beta.aviasales.ru/tickets?searchId=${searchId}`,
        options: {
            method: 'GET',
        },
    });

    function updateTicketList(ticketList: Ticket[]): void {
        setSortedByNavbarTickets(ticketList);
    }

    function sortByPrice(): void {
        if (data) {
            const sortedByPrice = [...data.tickets].sort((a, b) => a.price - b.price);
            setSortedByTabTickets(sortedByPrice);
        }
    }

    function sortByTime(): void {
        if (data) {
            const sortedByTime = [...data.tickets].sort((a, b) => {
                const segmentTimeA = a.segments.find((segment) => segment.duration);
                const segmentTimeB = b.segments.find((segment) => segment.duration);
                if (segmentTimeB && segmentTimeA) {
                    return segmentTimeB?.duration < segmentTimeA?.duration ? 1 : -1;
                }
                return 0;
            });
            setSortedByTabTickets(sortedByTime);
        }
    }

    function sortTicketsByChosenTab(id: string): void {
        setChosenTabId(id);
        const sortObject = {
            '1': sortByPrice,
            '2': sortByTime,
        };
        // @ts-ignore
        return sortObject[id]();
    }

    useEffect(() => {
        if (data && data.stop) {
            sortByPrice();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    return (
        <>
            {!data && !error && <p>Загрузка...</p>}
            {error && <p>Ошибка</p>}
            {!!sortedByTabTickets.length && (
                <section className={classes.main}>
                    <NavigationBar
                        sortedByTabTickets={sortedByTabTickets}
                        updateTicketList={updateTicketList}
                        chosenTabId={chosenTabId}
                    />
                    <div>
                        <Tab sortTicketsByChosenTab={sortTicketsByChosenTab} />
                        {sortedByNavbarTickets.map((ticket) => (
                            <TicketBox key={ticket.price} ticket={ticket} />
                        ))}
                    </div>
                </section>
            )}
        </>
    );
}

import React, { useEffect, useState } from 'react';
import { useFetch } from '../../hooks';
import { Ticket, TicketId, TicketsTypes } from '../../interfaces';
import { NavigationBar } from './NavigationBar';
import { Tab } from './Tab';
import { sortByPrice, sortByTime } from '../../services/ticketSort';
import { TicketList } from '../TicketBox';

import classes from './Main.module.scss';

export function Main({ searchId }: TicketId): JSX.Element {
    const [sortedByTabTickets, setSortedByTabTickets] = useState<Ticket[]>([]);
    const [sortedByNavbarTickets, setSortedByNavbarTickets] = useState<Ticket[]>([]);
    const [chosenTabId, setChosenTabId] = useState<string>('1');
    const { data, error } = useFetch<TicketsTypes>({
        url: `https://front-test.beta.aviasales.ru/tickets?searchId=${searchId}`,
        options: { method: 'GET' },
    });

    function updateTicketList(ticketList: Ticket[]): void {
        setSortedByNavbarTickets(ticketList);
    }

    function sortTicketsByChosenTab(id: string): void {
        setChosenTabId(id);
        if (data) {
            const sortObject = {
                '1': sortByPrice(data.tickets),
                '2': sortByTime(data.tickets),
            };
            // @ts-ignore
            setSortedByTabTickets(sortObject[id]);
        }
    }

    useEffect(() => {
        if (data && data.stop) {
            setSortedByTabTickets(sortByPrice(data.tickets));
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
                        {sortedByNavbarTickets.slice(0, 5).map((ticket) => (
                            <TicketList key={ticket.price} ticket={ticket} />
                        ))}
                    </div>
                </section>
            )}
        </>
    );
}

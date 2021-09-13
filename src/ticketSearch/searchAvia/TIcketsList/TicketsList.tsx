import React, { useEffect, useState } from 'react';
import { useFetch } from '../../../hooks/useFetch';
import { Ticket, TicketId, TicketsTypes } from '../../../interfaces';

export function TicketsList({ searchId }: TicketId): JSX.Element {
    const { data, error } = useFetch<TicketsTypes>({
        url: `https://front-test.beta.aviasales.ru/tickets?searchId=${searchId}`,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [tickets, setTickets] = useState<Ticket[]>();
    useEffect(() => {
        if (data && data.stop) {
            setTickets(data.tickets);
        }
    }, [data]);

    return (
        <>
            {!data && !error && <p>Загрузка...</p>}
            {error && <p>Ошибка</p>}
        </>
    );
}

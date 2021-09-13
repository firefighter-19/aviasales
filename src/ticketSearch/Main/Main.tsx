import React from 'react';
import { Icon } from '../../common/Icon';
import { useFetch } from '../../hooks/useFetch';
import { TicketId } from '../../interfaces';
import { HeaderLogo } from '../HeaderLogo';
import { TicketsList } from '../searchAvia/TIcketsList';
import { NavigationBar } from '../searchAvia/TIcketsList/NavigationBar';

import classes from './Main.module.scss';

const AVIASALES_URL = 'https://front-test.beta.aviasales.ru/search';

export function Main(): JSX.Element {
    const { data, error } = useFetch<TicketId>({ url: `${AVIASALES_URL}` });
    if (error) return <p>Произошла ошибка при загрузке данных</p>;
    if (!data) return <p>Загрузка...</p>;
    return (
        <div className={classes.wrapper}>
            <HeaderLogo>
                <Icon id="logo_aero" />
            </HeaderLogo>
            <NavigationBar />
            <TicketsList searchId={data.searchId} />
        </div>
    );
}

import React from 'react';
import { Icon } from '../../common/Icon';
import { useFetch } from '../../hooks/useFetch';
import { TicketId } from '../../interfaces';
import { HeaderLogo } from '../HeaderLogo';
import { Main } from '../Main';

import classes from './MainQuery.module.scss';

const AVIASALES_URL = 'https://front-test.beta.aviasales.ru/search';

export function MainQuery(): JSX.Element {
    const { data, error } = useFetch<TicketId>({
        url: AVIASALES_URL,
        options: { method: 'GET' },
    });
    if (error) return <p>Произошла ошибка при загрузке данных</p>;
    if (!data) return <p>Загрузка...</p>;
    return (
        <div className={classes.wrapper}>
            <HeaderLogo>
                <Icon id="logo_aero" />
            </HeaderLogo>
            <Main searchId={data.searchId} />
        </div>
    );
}

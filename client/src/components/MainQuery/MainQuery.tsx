import React from 'react';
import { Icon } from '../../common/Icon';
import { useFetch } from '../../hooks/useFetch';
import { TicketId } from '../../interfaces';
import { HeaderLogo } from '../HeaderLogo';
import { Main } from '../Main';

import classes from './MainQuery.module.scss';

const AVIASALES_URL = 'https://front-test.beta.aviasales.ru/search';
const TOKEN_UPDATE_URL = 'http://localhost:5050/api/refresh';

export function MainQuery(): JSX.Element {
    const { data: searchId, error } = useFetch<TicketId>({
        url: AVIASALES_URL,
        options: { method: 'GET' },
    });
    const { data: token, error: tokenError } = useFetch({
        url: TOKEN_UPDATE_URL,
        options: { method: 'GET' },
    });

    if (error || tokenError) return <p>Произошла ошибка при загрузке данных</p>;
    if (!searchId && !token) return <p>Загрузка...</p>;
    return (
        <div className={classes.wrapper}>
            <HeaderLogo>
                <Icon id="logo_aero" />
            </HeaderLogo>
            {searchId && <Main searchId={searchId.searchId} />}
        </div>
    );
}

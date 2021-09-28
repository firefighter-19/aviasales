import React from 'react';
import { useFetch } from '../../hooks';

import classes from './Authorization.module.scss';

const DB_URL = 'http://localhost:5050/api';
export function Auth(): JSX.Element {
    // const [isAuth, setIsAuth] = useState<boolean>(false);
    const { data, error } = useFetch({
        url: DB_URL,
        options: {
            method: 'POST',
            credentials: 'same-origin',
        },
    });
    // useEffect(() => {
    //     if (localStorage.getItem('token')) {
    //     }
    // }, []);

    if (!data) return <p>Загрузка...</p>;
    if (error) return <p>Ошибка</p>;
    return <div className={classes.authorization__window}>123</div>;
}

import React, { ChangeEvent, useState } from 'react';

import classes from './Login.module.scss';

export function Login(): JSX.Element {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    function inputEmail({ target }: ChangeEvent<HTMLInputElement>) {
        setEmail(target.value);
    }

    function inputPassword({ target }: ChangeEvent<HTMLInputElement>) {
        setPassword(target.value);
    }

    async function loginUser() {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const loginUrl = 'http://localhost:5050/api/login';
    }

    async function makeRegistration() {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const registrationUrl = 'http://localhost:5050/api/registration';
    }

    return (
        <div className={classes.login__window}>
            <div>
                <div>
                    <input onChange={inputEmail} value={email} />
                </div>
                <div>
                    <input onChange={inputPassword} value={password} />
                </div>
            </div>
            <div>
                <button type="button" onClick={loginUser}>
                    Авторизоваться
                </button>
                <button type="button" onClick={makeRegistration}>
                    Зарегистрироваться
                </button>
            </div>
        </div>
    );
}

import React from 'react';

import classes from './Header.module.scss';

interface HeaderProps {
    children: JSX.Element;
}

export function Header({ children }: HeaderProps): JSX.Element {
    return <header className={classes.header}>{children}</header>;
}

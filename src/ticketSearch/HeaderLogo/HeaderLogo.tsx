import React from 'react';

import classes from './HeaderLogo.module.scss';

interface HeaderProps {
    children: JSX.Element;
}

export function HeaderLogo({ children }: HeaderProps): JSX.Element {
    return <header className={classes.header}>{children}</header>;
}

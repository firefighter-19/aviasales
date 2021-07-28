import React from 'react';

import classes from './Aside.module.scss';

interface AsideProps {
    data: any;
}

export function Aside({ data }: AsideProps): JSX.Element {
    return <aside className={classes.aside}>Privet{data}</aside>;
}

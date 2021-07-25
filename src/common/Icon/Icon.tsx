import React from 'react';
import cn from 'classnames';
import sprite from './sprite.svg';

import styles from './Icon.module.scss';

interface Props {
    id: string;
    modifier?: string;
    onClick?(): void;
}

export const Icon = ({ onClick, id, modifier }: Props): JSX.Element => (
    <svg
        className={cn(styles.icon, {
            [styles[`icon_${modifier}`]]: modifier,
        })}
        onClick={onClick}
    >
        <use xlinkHref={`${sprite}#${id}`} />
    </svg>
);

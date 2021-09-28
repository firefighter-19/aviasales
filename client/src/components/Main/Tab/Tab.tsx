import React, { useState } from 'react';
import cn from 'classnames';

import classes from './Tab.module.scss';

interface TabProps {
    sortTicketsByChosenTab(id: string): void;
}

export function Tab({ sortTicketsByChosenTab }: TabProps): JSX.Element {
    const tabList = [
        { id: '1', tabText: 'Самый дешёвый', chosen: true },
        { id: '2', tabText: 'Самый быстрый', chosen: false },
    ];
    const [tabs, setTabs] = useState(tabList);

    function chooseTab(id: string): void {
        sortTicketsByChosenTab(id);
        const chosenTab = tabs.map((tab) =>
            tab.id === id ? { ...tab, chosen: true } : { ...tab, chosen: false },
        );
        setTabs(chosenTab);
    }

    function chooseTabByKeyboard({ key }: React.KeyboardEvent<HTMLDivElement>): void {
        console.log('key ===========>: ', key);
    }

    return (
        <div className={classes.tab__container}>
            {tabs.map((tab, index) => (
                <div
                    key={tab.id}
                    onClick={() => chooseTab(tab.id)}
                    onKeyDown={chooseTabByKeyboard}
                    role="menuitem"
                    tabIndex={index}
                    className={cn(classes.tab, {
                        [classes.tab_active]: tab.chosen,
                    })}
                >
                    {tab.tabText}
                </div>
            ))}
        </div>
    );
}

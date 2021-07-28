import React from 'react';
import classes from './App.module.scss';
import { Icon } from './common/Icon';
import { Header } from './header';

const App: React.FC = () => {
    return (
        <div className={classes.app}>
            <Header>
                <Icon id="logo_aero" />
            </Header>
        </div>
    );
};

export default App;

import React from 'react';
import classes from './App.module.scss';
import { Main } from './ticketSearch/Main/Main';

const App: React.FC = () => {
    return (
        <div className={classes.app}>
            <Main />
        </div>
    );
};

export default App;

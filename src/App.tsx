import React from 'react';
import classes from './App.module.scss';
import { MainQuery } from './ticketSearch/MainQuery/MainQuery';

const App: React.FC = () => {
    return (
        <div className={classes.app}>
            <MainQuery />
        </div>
    );
};

export default App;

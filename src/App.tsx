import React from 'react';
import classes from './App.module.scss';
import { Icon } from './common/Icon';

const App: React.FC = () => {
    return (
        <div className={classes.app}>
            <Icon id="logo_aero" />
        </div>
    );
};

export default App;

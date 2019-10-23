import React from 'react';

import classes from './App.css';
import Weather from '../container/Weather/Weather';

const app = () => {
  return (
    <div className={classes.App}>
      <Weather />
    </div>
  )
};

export default app;
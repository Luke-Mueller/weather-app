import React from 'react';

import classes from './Toolbar.module.css';

const toolbar = () => (
  <div className={classes.Toolbar}>
    <a href="/">Now</a>
    <a href="/">5-day</a>
  </div>
);

export default toolbar;
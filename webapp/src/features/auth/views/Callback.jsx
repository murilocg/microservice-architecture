import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';

export const callback = () => {
  return (
    <Grid
      container
      direction='column'
      justify='center'
      alignItems='center'
      style={{
        height: window.innerHeight
      }}
    >
      <CircularProgress color='primary' />
    </Grid>
  );
};

export default callback;

import React from 'react';
import { Grid, CircularProgress } from '@mui/material';

type Props = {};

const Loading = (props: Props) => {
  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item>
        <CircularProgress size={80} />
      </Grid>
    </Grid>
  );
};

export default Loading;

import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import LayoutBody from '../LayoutBody';
import Typography from '../Typography';

const text = {
  color: 'white'
};

const styles = theme => ({
  root: {
    display: 'flex',
    backgroundColor: '#000000',
  },
  layoutBody: {
    marginTop: theme.spacing.unit * 8,
    marginBottom: theme.spacing.unit * 8,
    display: 'flex',
  },
  iconsWrapper: {
    height: 120,
  },
  icons: {
    display: 'flex',
  },
  icon: {
    width: 48,
    height: 48,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.warning.main,
    marginRight: theme.spacing.unit,
    '&:hover': {
      backgroundColor: theme.palette.warning.dark,
    },
  },
  list: {
    margin: 0,
    listStyle: 'none',
    paddingLeft: 0,
  },
  listItem: {
    paddingTop: theme.spacing.unit / 2,
    paddingBottom: theme.spacing.unit / 2,
  },
  language: {
    marginTop: theme.spacing.unit,
    width: 150,
  },
});

function AppFooter(props) {
  const { classes } = props;

  return (
    <Typography component="footer" className={classes.root}>
      <LayoutBody className={classes.layoutBody} width="large">
        <Grid container spacing={40}>
              <Grid item xs={12} sm={12} md={6}>
              <div style={text}>Designed by: </div>
            </Grid>
            </Grid>
          <Grid container spacing={40}>  
            <Grid item xs={12} sm={12} md={6}>
              <div style={text}>Travis Hill, Sarah Maples, Diwal Pyakurel, Jimin Huh, Daniel Barkley</div>
            </Grid>
            </Grid>
      </LayoutBody>
    </Typography>
  );
}

AppFooter.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  pure,
  withStyles(styles),
)(AppFooter);
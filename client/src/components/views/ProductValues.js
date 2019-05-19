import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import LayoutBody from '../LayoutBody';
import Typography from '../Typography';

const styles = theme => ({
  root: {
    display: 'flex',
    overflow: 'hidden',
    backgroundColor: '#F4F4F4',
  },
  layoutBody: {
    marginTop: theme.spacing.unit * 15,
    marginBottom: theme.spacing.unit * 30,
    display: 'flex',
    position: 'relative',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `0px ${theme.spacing.unit * 5}px`,
  },
  image: {
    height: 55,
  },
  title: {
    marginTop: theme.spacing.unit * 5,
    marginBottom: theme.spacing.unit * 5,
  },
  curvyLines: {
    pointerEvents: 'none',
    position: 'absolute',
    top: -180,
  },
});

function ProductValues(props) {
  const { classes } = props;

  return (
    <section className={classes.root}>
      <LayoutBody className={classes.layoutBody} width="large">
        <img
          src="/static/themes/onepirate/productCurvyLines.png"
          className={classes.curvyLines}
          alt="curvy lines"
        />
        <Grid container spacing={40}>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>


              <Typography variant="h6" className={classes.title}>
                Unlimited number of groups.
              </Typography>
              <Typography variant="h5">
                {'Say something cool'}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>


              <Typography variant="h6" className={classes.title}>
                Grow as a team.
              </Typography>
              <Typography variant="h5">
                {'Say something cool'}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>


              <Typography variant="h6" className={classes.title}>
                Increase your productivity.
              </Typography>
              <Typography variant="h5">
                {'Say something cool'}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </LayoutBody>
    </section>
  );
}

ProductValues.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductValues);
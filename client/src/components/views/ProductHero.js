import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Button from '../Button';
import Typography from '../Typography';
import ProductHeroLayout from './ProductHeroLayout';

const backgroundImage =
  "http://bhaktibhajan.com/images/bg-light.jpg";

const styles = theme => ({
  background: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundPosition: 'center',
  },
  button: {
    minWidth: 160,
  },
  h5: {
    marginBottom: theme.spacing.unit * 4,
    marginTop: theme.spacing.unit * 4,
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing.unit * 10,
    },
  },
  more: {
    marginTop: theme.spacing.unit * 2,
  },
});

function ProductHero(props) {
  const { classes } = props;

  return (
    <ProductHeroLayout backgroundClassName={classes.background}>
      {/* Increase the network loading priority of the background image. */}
      <img style={{ display: 'none' }} src={backgroundImage} alt="" />
      <Typography color="black" align="center" variant="h2" marked="center">
        (Logo)
      </Typography>
      <Typography color="black" align="center" variant="h5" className={classes.h5}>
        (Something)
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        className={classes.button}
        component={linkProps => (
          <Link {...linkProps} href="/signup" variant="button" />
        )}
      >
        Sign Up
      </Button>
      <Typography variant="body2" color="inherit" className={classes.more}>
        
      </Typography>
    </ProductHeroLayout>
  );
}

ProductHero.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductHero);
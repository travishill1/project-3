import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Link as RouterLink} from "react-router-dom";
import Link from '@material-ui/core/Link';
import AppBar from '../AppBar';
import Toolbar, { styles as toolbarStyles } from '../Toolbar';


const styles = theme => ({

  title: {
    fontSize: 20,
  },
  placeholder: toolbarStyles(theme).root,
  toolbar: {
    justifyContent: 'space-between',
  },
  leftLinkActive: {
    color: theme.palette.common.white,
  },
  right: {
    fontSize: 30,
    color: 'white',
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  rightLink: {
    fontSize: 20,
    color: theme.palette.common.white,
    marginLeft: theme.spacing.unit * 3,
  },
  leftLink: {
    fontSize: 20,
    color: theme.palette.common.white,
    marginLeft: theme.spacing.unit * 1,
  },
  linkSecondary: {
    color: theme.palette.secondary.main,
  },
});

function AppAppBar(props) {
  const { classes } = props;

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          <div className={classes.leftLink} />
          <Link component={RouterLink} to="/" 
            variant="h6"
            underline="hover"
            color="inherit"
            className={classes.leftLink}
          >
            {'Welcome to Slello'}
          </Link>
          <div className={classes.right}>
          <Link component={RouterLink} to="/signin"
            variant="h6"
            underline="hover"
            color="inherit"
            className={classNames(classes.rightLink, classes.linkSecondary)}
          >
            {'Sign In'}
          </Link>
          <Link component={RouterLink} to="/signup"
            variant="h6"
            underline="hover"
            color="inherit"
            className={classes.rightLink}
          >
            {'Sign Up'}
          </Link>
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.placeholder} />
    </div>
  );
}

AppAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppAppBar);
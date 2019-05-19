import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LayoutBody from '../LayoutBody';
import Paper from '../Paper';

const styles = theme => ({
  root: {
    display: 'flex',
    backgroundImage: "http://bhaktibhajan.com/images/bg-light.jpg",
    backgroundRepeat: 'no-repeat',
  },
  paper: {
    padding: `${theme.spacing.unit * 4}px ${theme.spacing.unit * 3}px`,
    [theme.breakpoints.up('md')]: {
      padding: `${theme.spacing.unit * 10}px ${theme.spacing.unit * 8}px`,
    },
  },
});

function AppForm(props) {
  const { children, classes } = props;

  return (
    <div className={classes.root}>
      <LayoutBody margin marginBottom width="small">
        <Paper className={classes.paper}>{children}</Paper>
      </LayoutBody>
    </div>
  );
}

AppForm.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppForm);
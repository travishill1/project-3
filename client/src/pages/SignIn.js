import withRoot from '../withRoot';
import React from 'react';
import {   BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter} from "react-router-dom";
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
// import Link from '@material-ui/core/Link';
import { Link as RouterLink} from "react-router-dom";
import { Field, Form, FormSpy } from 'react-final-form';
import Typography from '../components/Typography';
import AppFooter from '../components/views/AppFooter';
import AppAppBar from '../components/views/AppAppBar';
import AppForm from '../components/views/AppForm';
import { email, required } from '../components/validation';
import RFTextField from '../components/RFTextField';
import FormButton from '../components/FormButton';
import FormFeedback from '../components/FormFeedback';
// import Chatkit from "@pusher/chatkit-server";


const styles = theme => ({
  form: {
    marginTop: theme.spacing.unit * 6,
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 2,
  },
  feedback: {
    marginTop: theme.spacing.unit * 2,
  },
});

class SignIn extends React.Component {
  state = {
    sent: false,
    isLoggedIn: false
  };

  validate = values => {
    const errors = required(['username', 'password'], values, this.props);

    return errors;
  };

  handleSubmit = (e) => {
    // here is where i will need to check if theyre actually a member
    // for now we just gonna redirect teehee
    
    this.setState({ isLoggedIn: true });
  };

  render() {
    const { classes } = this.props;
    const { sent } = this.state;
    let { isLoggedIn } = this.state;
    let { from } = this.props.location.state || { from: { 
      pathname: "/chat",
      state: {currentUser: this.currentUser}} };

    if (isLoggedIn) return <Redirect to={from} />;

    return (
      <React.Fragment>
        <AppAppBar />
        <AppForm>
          <React.Fragment>
            <Typography variant="h3" gutterBottom marked="center" align="center">
              Sign In
            </Typography>
            <Typography variant="body2" align="center">
              {'Not a member yet? '}
              <Link component={RouterLink} to="/signup" align="center" underline="always">
                Sign Up here
              </Link>
            </Typography>
          </React.Fragment>
          <Form
            onSubmit={this.handleSubmit}
            subscription={{ submitting: true }}
            validate={this.validate}
          >
            {({ handleSubmit, submitting }) => (
              <form onSubmit={handleSubmit} className={classes.form} noValidate>
                <Field
                  autoFocus
                  component={RFTextField}
                  disabled={submitting || sent}
                  fullWidth
                  label="Username"
                  margin="normal"
                  name="username"
                  required
                  size="large"
                />
                <Field
                  fullWidth
                  size="large"
                  component={RFTextField}
                  disabled={submitting || sent}
                  required
                  name="password"
                  autoComplete="current-password"
                  label="Password"
                  type="password"
                  margin="normal"
                />
                <FormSpy subscription={{ submitError: true }}>
                  {({ submitError }) =>
                    submitError ? (
                      <FormFeedback className={classes.feedback} error>
                        {submitError}
                      </FormFeedback>
                    ) : null
                  }
                </FormSpy>
                <FormButton
                  className={classes.button}
                  disabled={submitting || sent}
                  size="large"
                  color="secondary"
                  fullWidth
                >
                  {submitting || sent ? 'In progress…' : 'Sign In'}
                </FormButton>
              </form>
            )}
          </Form>
          <Typography align="center">
            <Link underline="always" href="/premium-themes/onepirate/forgot-password">
              Forgot password?
            </Link>
          </Typography>
        </AppForm>
        <AppFooter />
      </React.Fragment>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withRoot,
  withStyles(styles),
)(SignIn);
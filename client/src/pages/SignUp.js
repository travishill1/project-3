import withRoot from '../withRoot';
import React from 'react';
import {   BrowserRouter as
  Link,
  Redirect} from "react-router-dom";
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
// import Link from '@material-ui/core/Link';
import { Field, Form, FormSpy } from 'react-final-form';
import Typography from '../components/Typography';
import API from "../utils/API";
import AppFooter from '../components/views/AppFooter';
import AppAppBar from '../components/views/AppAppBar';
import AppForm from '../components/views/AppForm';
import { required } from '../components/validation';
import RFTextField from '../components/RFTextField';
import FormButton from '../components/FormButton';
import FormFeedback from '../components/FormFeedback';
import Chatkit from "@pusher/chatkit-server";


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

class SignUp extends React.Component {
  state = {
    sent: false,
<<<<<<< HEAD
    username: "",
    password: "",
    isLoggedIn: false
=======
    isLoggedIn: false,
    currentUser: null
>>>>>>> bc4fc94a99d6a4b52b7cd380725c00b8ee07431f
  };

  validate = values => {
    const errors = required(['username', 'password'], values, this.props);

    return errors;
  };

  handleSubmit = (e) => {
    const userName = e.username;
    const password = e.password;
      API.saveUser({
        username: userName,
        password: password
      })
      .then(res => console.log(res))
      .catch(err => console.log(err))
    
    // authenticationnnn
    const chatkit = new Chatkit({
      instanceLocator: "v1:us1:758e334a-5a1d-4660-8590-24de4fb4637f",
      key: "651c8427-5d1d-4fe8-ac94-8564fc936151:6dJqkmwnBLJ9zzurElq7kLxcKJ2kmAdHnAHeXcdgQ6U="
    });

    // creating new user on sign up
    chatkit.createUser({
      name: userName,
      id: userName
    })
    // 
    .then(currentUser => {
      console.log("yes i am here", currentUser)
      this.setState({ isLoggedIn: true,
                      currentUser });
    })
    .catch(err =>{
      if(err.error === "services/chatkit/user_already_exists"){
        console.log("user already exists. redirecting to chat page...");

        this.setState({ isLoggedIn: true });
      }
    })

  };

  render() {
    const { classes } = this.props;
    const { sent } = this.state;
    let { isLoggedIn } = this.state;
    let { from } = this.props.location.state || { from: { 
      pathname: "/chat",
      state: {currentUser: this.state.currentUser}} };

    if (isLoggedIn) return <Redirect to={from} />;

    return (
      <React.Fragment>
        <AppAppBar />
        <AppForm>
          <React.Fragment>
            <Typography variant="h3" gutterBottom marked="center" align="center">
              Sign Up
            </Typography>
            <Typography variant="body2" align="center">
              <Link to="/signin" underline="always">
                Already have an account?
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
                  component={RFTextField}
                  disabled={submitting || sent}
                  fullWidth
                  label="Username"
                  margin="normal"
                  name="username"
                  required  
                />
                <Field
                  fullWidth
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
                    color="secondary"
                    fullWidth
                  >
                    {submitting || sent ? 'In progress…' : 'Sign Up'}
                  </FormButton>
              </form>
            )}
          </Form>
        </AppForm>
        <AppFooter />
      </React.Fragment>
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withRoot,
  withStyles(styles),
)(SignUp);
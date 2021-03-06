import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component {
  handleFormSubmit(formProps) {
    this.props.signupUser(formProps);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className='alert alert-danger'>
          <strong>Opps!</strong> { this.props.errorMessage }
        </div>
      )
    }
  }

  render() {
    const { handleSubmit, fields: { email, password, passwordConfirm } } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Email:</label>
          <input type="text" className="form-control" {...email} />
          { email.touched && password.error && <div className="error">{ email.error }</div> }
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <input type="password" className="form-control" {...password} />
          { password.touched && password.error && <div className="error">{ password.error }</div> }
        </fieldset>
        <fieldset className="form-group">
          <label>Confirm Password:</label>
          <input type="password" className="form-control" {...passwordConfirm} />
          { passwordConfirm.touched && password.error && <div className="error">{ passwordConfirm.error }</div> }
        </fieldset>
        { this.renderAlert() }
        <button action="submit" className="btn btn-primary">Sign up!</button>
      </form>
    );
  }
}

function validate(formProps) {
  const errors = {};
  if (!formProps.email) {
    errors.email = 'Please enter a email.';
  }
  if (!formProps.password) {
    errors.password = 'Please enter a password.';
  }
  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please enter password again.';
  }
  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Password not match.';
  }
  return errors;
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.error };
}


export default reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirm'],
  validate,
}, mapStateToProps, actions)(Signup);

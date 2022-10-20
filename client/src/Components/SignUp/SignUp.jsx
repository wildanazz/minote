import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput } from "mdbreact";
import validate from "validator";
import { signUp } from "../../utils/APICalls";
import "./SignUp.css";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      isNameEmpty: false,
      isEmailInvalid: false,
      isPasswordEmpty: false,
      isSignUpFailed: false,
      errorMessage: "",
    };
  }

  handleNameChange = (e) => {
    this.setState({
      name: e.target.value,
      isNameEmpty: false,
    });
  };

  handleEmailChange = (e) => {
    this.setState({
      email: e.target.value,
      isEmailInvalid: false,
    });
  };

  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value,
      isPasswordEmpty: false,
    });
  };

  handleValidation = () => {
    const { name, email, password } = this.state;
    let invalid = false;
    if (name.trim() === "") {
      invalid = "isNameEmpty";
    } else if (!validate.isEmail(email)) {
      invalid = "isEmailInvalid";
    } else if (password.trim() === "") {
      invalid = "isPasswordEmpty";
    }
    return invalid;
  };

  handleSubmit = async () => {
    const { name, email, password } = this.state;
    const { toggleSignUp } = this.props;

    const invalidField = this.handleValidation();

    if (invalidField) {
      this.setState({ [invalidField]: true });
    } else {
      try {
        await signUp(name, email, password);
        toggleSignUp();
      } catch (e) {
        let errorMessage;
        if (e.data.errmsg) {
          errorMessage = e.data.errmsg;
        } else if (e.data.errors.password) {
          errorMessage =
            "Password is too short. It must be at least 7 characters.";
        } else {
          errorMessage = e.data.message;
        }
        this.setState({
          isSignUpFailed: true,
          errorMessage,
        });
      }
    }
  };

  render() {
    const {
      name,
      email,
      password,
      isNameEmpty,
      isEmailInvalid,
      isPasswordEmpty,
      isSignUpFailed,
      errorMessage,
    } = this.state;
    const { toggleSignIn } = this.props;
    return (
      <MDBContainer className="login-main">
        <MDBRow className="align-center">
          <MDBCol md="6">
            <p className="h5 text-center signup-heading">Sign Up</p>
            <div className="grey-text">
              <MDBInput
                label="Your name"
                icon="user"
                group
                type="text"
                validate
                error="wrong"
                success="right"
                autoFocus
                value={name}
                onChange={this.handleNameChange}
                size={isNameEmpty ? "lg inputErrorDiv" : "lg"}
                className={isNameEmpty ? "inputError" : ""}
              />
              {isNameEmpty && (
                <span className="signup-error-text">
                  Name can&apos;t be blank.
                </span>
              )}
              <MDBInput
                label="Your email"
                icon="envelope"
                group
                type="email"
                validate
                error="wrong"
                success="right"
                value={email}
                onChange={this.handleEmailChange}
                size={isEmailInvalid ? "lg inputErrorDiv" : "lg"}
                className={isEmailInvalid ? "inputError" : ""}
              />
              {isEmailInvalid && (
                <span className="signup-error-text">
                  Please enter a valid email address.
                </span>
              )}
              <MDBInput
                label="Your password"
                icon="lock"
                group
                type="password"
                validate
                value={password}
                onChange={this.handlePasswordChange}
                size={isPasswordEmpty ? "lg inputErrorDiv" : "lg"}
                className={isPasswordEmpty ? "inputError" : ""}
              />
              {isPasswordEmpty && (
                <span className="signup-error-text">
                  Password can&apos;t be blank.
                </span>
              )}
              {isSignUpFailed && (
                <span className="signup-error-text signin-bad-response">
                  Error: {errorMessage}, please try again.
                </span>
              )}
            </div>
            <div className="align-center">
              <button
                type="button"
                onClick={() => {
                  this.handleSubmit();
                }}
                className="btn Ripple-parent btn btn-outline-info-modified Ripple-parent waves-effect"
              >
                Create My Account
              </button>
              <div className="align-center">
                <button
                  type="button"
                  className="login-link"
                  onClick={() => {
                    toggleSignIn();
                  }}
                >
                  Already have account? Sign In
                </button>
              </div>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

export default SignUp;

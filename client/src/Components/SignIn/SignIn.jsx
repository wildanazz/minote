import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput } from "mdbreact";
import validate from "validator";
import { signIn } from "../../utils/APICalls";
import "./SignIn.css";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "wildanazzwa@gmail.com",
      password: "password",
      isEmailInvalid: false,
      isPasswordEmpty: false,
      isSignInFailed: false,
      errorMessage: "",
    };
  }

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
    const { email, password } = this.state;
    let isInvalid = false;
    if (!validate.isEmail(email)) {
      isInvalid = "isEmailInvalid";
    } else if (password === "") {
      isInvalid = "isPasswordEmpty";
    }
    return isInvalid;
  };

  handleSubmit = async () => {
    const { email, password } = this.state;
    const { handleSignIn } = this.props;
    const isInvalid = this.handleValidation();
    if (isInvalid) {
      this.setState({ [isInvalid]: true });
    } else {
      try {
        const user = await signIn(email, password);
        handleSignIn(user);
      } catch (e) {
        let errorMessage;
        if (e && e.status && e.status === 400) {
          errorMessage = "Incorrect email/password.";
        } else {
          errorMessage = "Something went wrong, please try again later.";
        }
        this.setState({
          isSignInFailed: true,
          errorMessage,
        });
      }
    }
  };

  render() {
    const {
      email,
      password,
      isEmailInvalid,
      isPasswordEmpty,
      isSignInFailed,
      errorMessage,
    } = this.state;
    const { toggleSignUp } = this.props;
    return (
      <MDBContainer className="login-main">
        <MDBRow className="align-center">
          <MDBCol md="6">
            <p className="h5 text-center login-heading">Sign In</p>
            <div className="grey-text">
              <MDBInput
                label="Email:"
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
                <span className="signup-error-text">Email is invalid.</span>
              )}
              <MDBInput
                label="Password: "
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
              {isSignInFailed && (
                <span className="signup-error-text signin-bad-response">
                  {errorMessage}
                </span>
              )}
            </div>
            <div className="align-center">
              <button
                onClick={() => {
                  this.handleSubmit();
                }}
                type="button"
                className="btn Ripple-parent btn btn-outline-info-modified Ripple-parent waves-effect"
              >
                Sign In
              </button>
              <div className="align-center">
                <button
                  type="submit"
                  className="signup"
                  onClick={() => {
                    toggleSignUp();
                  }}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

export default SignIn;

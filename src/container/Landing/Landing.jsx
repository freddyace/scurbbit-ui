import React, { useEffect, useState } from "react";
import "../../App.css";
import "../../assets/bootstrap/css/bootstrap.min.css";
import "./Landing.css";
import "../Landing/styles.css";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useAuth } from "../../helpers/context/useAuth.jsx";
import { useForm } from "../../helpers/validation/useForm";

const Landing = () => {
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  let scrubbitAuth = useAuth();
  let history = useHistory();
  const {
    dataz, // handles form submission
    handleChangez, // handles input changes
    handleSubmitz, // access to the form data
    errorsz, // includes the errors to show
    clearErrors,
  } = useForm({
    // the hook we are going to create
    validations: {
      // all our validation rules go here
      email: {
        pattern: {
          value:
            '/^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/',
          message: "Invalid email address",
        },
        required: {
          value: true,
          message: "Email address is required",
        },
      },
      password: {
        length: {
          value: 8,
          message: "Password must be at least 8 characters",
        },
        required: {
          value: true,
          message: "Password is required",
        },
      },
      confirmPassword: {
        match: {
          value: true,
          message: "Passwords must match",
        },
      },
    },
    onSubmit: () => console.log("Form submitted..."),
    initialValues: {
      // used to initialize the data
      name: "John",
    },
  });
  const [passwordInput, setPasswordInput] = useState();
  const [emailInput, setEmailInput] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("user"));
  const [isLoading, setIsLoading] = useState(false);
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [firebaseValidationError, setFirebaseValidationError] = useState();
  const [showCreateAccountButton, setShowCreateAccountButton] = useState(true);
  const [showEmailField, setShowEmailField] = useState(true);
  const [showPasswordField, setShowPasswordField] = useState(true);

  const showLoader = () => {
    console.log("inside showLoader");
    return (
      <div
        style={{
          textAlign: "center",
          margin: "auto",
          width: "50%",
          padding: "10px",
        }}
      >
        <div class="lds-ripple">
          <div></div>
          <div></div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    console.log("user credential: ", scrubbitAuth);
  });
  const handleSubmit = (e) => {
    // setPersistence(firebaseAuth, firebase.auth.Auth.Persistence.NONE);
    clearErrors();
    setFirebaseValidationError();
    handleSubmitz(e);
    const hasValidationErrors = Object.keys(errorsz).length > 0;
    console.log("has validation errors? ", hasValidationErrors);
    if (hasValidationErrors) {
      setIsLoading(false);
      return;
    } else {
      scrubbitAuth.signin(
        () => {
          history.replace(from);
          history.push("/dashboard");
          setIsLoading(false);
        },
        emailInput,
        passwordInput
      );
    }
  };

  const handleSubmitForgotPassword = (e) => {
    console.log("Attempting to send email...");
    setIsLoading(true);
    handleSubmitz(e);
    const auth = getAuth();
    const hasValidationErrors = Object.keys(errorsz).length > 0;
    if (hasValidationErrors) {
      setIsLoading(false);
      return;
    }
    sendPasswordResetEmail(auth, emailInput)
      .then(() => {
        // Password reset email sent!
        // ..
        setIsLoading(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("An error occured while attempting to send email: ");
        console.log("error code: ", error.code);
        console.log("error message: ", error.message);
        setIsLoading(false);
      });
  };

  const goToDashboard = () => {
    console.log("calling go to dashboard");
    // history.push("/dashboard");
    return (
      <Redirect
        to={{
          pathname: "/dashboard",
          state: { from: location },
        }}
      />
    );
  };
  return isLoading ? (
    showLoader()
  ) : isLoggedIn ? (
    goToDashboard()
  ) : (
    <div className="container full-height">
      <section className="login-clean">
        <form>
          <h1 style={{ color: "gray", textAlign: "center" }}>Scrubbit</h1>
          <h6 style={{ color: "gray", textAlign: "center" }}>Mobile Wash</h6>
          <div className="illustration">
            <i className="icon ion-waterdrop"></i>
          </div>
          <div className="mb-3">
            {firebaseValidationError && (
              <p className="error">{firebaseValidationError}</p>
            )}
            {scrubbitAuth.firebaseValidationError && (
              <p className="error">{scrubbitAuth.firebaseValidationError}</p>
            )}
            {errorsz.email && <p className="error">{errorsz.email}</p>}
            {showEmailField ? (
              <input
                className="form-control"
                type="email"
                name="email"
                placeholder="Email"
                value={emailInput ? emailInput : undefined}
                onChange={(e) => {
                  setEmailInput(e.target.value);
                  handleChangez("email", null, e);
                }}
              />
            ) : (
              <div />
            )}
          </div>
          {showPasswordField ? (
            <div className="mb-3">
              {errorsz.password && <p className="error">{errorsz.password}</p>}
              <input
                className="form-control"
                type="password"
                name="password"
                placeholder="Password"
                value={passwordInput ? passwordInput : undefined}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  handleChangez("password", null, e);
                }}
              />
            </div>
          ) : (
            <div />
          )}
          {!isResettingPassword && !isCreatingAccount ? (
            <a
              className="forgot"
              onClick={() => {
                setIsResettingPassword(true);
                setIsCreatingAccount(false);
                setShowPasswordField(false);
              }}
            >
              Forgot your email or password?
            </a>
          ) : (
            <div />
          )}
          {!isCreatingAccount && !isResettingPassword ? (
            <div className="mb-3">
              <button
                className="btn btn-primary d-block w-100"
                type="button"
                onClick={handleSubmit}
              >
                Log In
              </button>
            </div>
          ) : (
            <div />
          )}
          {isResettingPassword ? (
            <div className="mb-3">
              <button
                className="btn btn-primary d-block w-100"
                type="button"
                onClick={handleSubmitForgotPassword}
              >
                Send email
              </button>
            </div>
          ) : (
            <div />
          )}
          {showCreateAccountButton && !isResettingPassword ? (
            <button
              className="btn btn-primary d-block w-100"
              type="button"
              onClick={(e) => {
                history.push("/createAccount");
              }}
            >
              Create Account
            </button>
          ) : (
            <div />
          )}
          {isResettingPassword ? (
            <a
              className="forgot"
              onClick={() => {
                setShowEmailField(true);
                setShowPasswordField(true);
                setIsResettingPassword(false);
                setIsCreatingAccount(false);
              }}
            >
              Cancel
            </a>
          ) : (
            <div />
          )}
          <p
            style={{
              color: "gray",
              textAlign: "center",
              fontSize: "10px",
              paddingTop: "20px",
              marginBottom: "-20px",
            }}
          >
            © 2020 - 2022 Scrubbit Car Wash LLC
          </p>
        </form>
      </section>
      <script src="assets/bootstrap/js/bootstrap.min.js"></script>
    </div>
  );
};
export default Landing;

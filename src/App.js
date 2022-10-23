import React, { useEffect, useState } from "react";
import "./App.css";
import "./Login-Form-Clean.css";
import "./bootstrap.min.css";
import "../src/fonts/ionicons.min.css";
import CreateAccount from "./container/Landing/CreateAccount/CreateAccount";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import FacebookLogin from "react-facebook-login";
import Dashboard from "../src/container/Dashboard/Dashboard.jsx";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import EditProfile from "../src/container/EditProfile/EditProfile.jsx";
import SelectScrubber from "./container/OnDemand/SelectScrubber.jsx";
import AppNavBar from "./component/AppNavBar/AppNavBar";
import About from "./container/About";
import Contact from "./container/Contact/Contact";
import { useForm } from "./helpers/validation/useForm";
import { firebaseErrorConstants } from "./helpers/firebaseErrorConstants";
import { auth } from "firebaseui";
import { useAuth, ProvideAuth } from "./helpers/context/useAuth.jsx";
import EmailVerification from "./container/Landing/CreateAccount/Verification/EmailVerification";
function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyCWL_temTPCHVn4wceJ5SAW-wIWoO2dVFc",
    authDomain: "scrubbit-dev.firebaseapp.com",
    projectId: "scrubbit-dev",
    storageBucket: "scrubbit-dev.appspot.com",
    messagingSenderId: "1077005806950",
    appId: "1:1077005806950:web:106927ec05230a13f86ca7",
    measurementId: "G-X834WHSM3Z",
    databaseURL: "https://scrubbit-dev-default-rtdb.firebaseio.com/",
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const storage = getStorage();
  // const picRef = ref(storage);
  const firebaseAuth = getAuth(app);

  const analytics = getAnalytics(app);
  const showLoader = () => {
    return (
      <Loader
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={30000} //3 secs
      />
    );
  };

  const Landing = () => {
    const [loggedin, setLoggedin] = useState(false);
    const [data, setData] = useState({});
    const [picture, setPicture] = useState("");
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
            value: "^[A-Za-z]*$",
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
    const [usernameInput, setUsernameInput] = useState();
    const [passwordInput, setPasswordInput] = useState();
    const [confirmPasswordInput, setConfirmPasswordInput] = useState();
    const [emailInput, setEmailInput] = useState();
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("user"));
    const [isLoading, setIsLoading] = useState(false);
    const [isCreatingAccount, setIsCreatingAccount] = useState(false);
    const [isResettingPassword, setIsResettingPassword] = useState(false);
    const [isLoggingIn, setIsLoggingIn] = useState(true);
    const [firebaseValidationError, setFirebaseValidationError] = useState();
    const [showNextButton, setShowNextButton] = useState(false);
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [dateOfBirth, setDateOfBirth] = useState();
    const [addressLine1, setAddressLine1] = useState();
    const [addressLine2, setAddressLine2] = useState();
    const [city, setCity] = useState();
    const [homeState, setHomeState] = useState();
    const [zip, setZip] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [dateType, setDateType] = useState("text");
    const [showPrevious, setShowPrevious] = useState(false);
    const [emailPasswordFormFilled, setEmailPasswordFormFilled] = useState(
      false
    );
    const [showLoginButton, setShowLoginButton] = useState(true);
    const [showCreateAccountButton, setShowCreateAccountButton] = useState(
      true
    );
    const [showCancelButton, setShowCancelButton] = useState(false);
    const [personalInfoFormFilled, setPersonalInfoFormFilled] = useState(false);
    const [showEmailField, setShowEmailField] = useState(true);
    const [showPasswordField, setShowPasswordField] = useState(true);
    const [showConfirmPasswordField, setShowConfirmPasswordField] = useState(
      false
    );
    const [showFirstNameField, setShowFirstNameField] = useState(false);
    const [showLastNameField, setShowLastNameField] = useState(false);
    const [showDOBField, setShowDOBField] = useState(false);
    const createAccountProgressBarArray = [
      "emailAndpassword",
      "personalInfo",
      "address",
    ];
    const [showAddressLine1Field, setShowAddressLine1Field] = useState(false);
    const [showAddressLine2Field, setShowAddressLine2Field] = useState(false);
    const [showCityField, setShowCityField] = useState(false);
    const [showHomeStateField, setShowHomeStateField] = useState(false);
    const [showZipField, setShowZipField] = useState(false);
    const [showPhoneNumberField, setShowPhoneNumberField] = useState(false);
    const [formIndex, setFormIndex] = useState(0);
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

    const responseFacebook = (response) => {
      console.log(response);
      setData(response);
      setPicture(response.picture.data.url);
      if (response.accessToken) {
        setLoggedin(true);
        <Redirect push to="/somewhere/else" />;
      } else {
        setLoggedin(false);
      }
    };

    const signout = () => {
      window.FB.logout();
      setLoggedin(false);
    };

    useEffect(() => {
      if (isLoading) {
        setIsLoading(true);
      }
    }, [isLoading]);
    useEffect(() => {});
    const handleCancelClicked = () => {
      showLoginForm();
    };
    const handlePreviousClicked = () => {
      setIsCreatingAccount(false);
      setIsResettingPassword(false);
      setShowNextButton(false);
      handleNextForm(true);
    };

    const handleNextForm = (previousClicked) => {
      let index = calcNextFormIndex();
      if (previousClicked) {
        index -= 1;
      }
      if (index == 0) {
        setShowPrevious(false);
        showCreateAccountEmailAndPasswordForm(true);
        showCreateAccountAddressInfoForm(false);
        showCreateAccountPersonalInfoForm(false);
        setShowCancelButton(true);
        setShowCreateAccountButton(false);
      } else if (index == 1) {
        setShowPrevious(true);
        showCreateAccountEmailAndPasswordForm(false);
        showCreateAccountAddressInfoForm(false);
        showCreateAccountPersonalInfoForm(true);
      } else if (index == 2) {
        setShowPrevious(true);
        showCreateAccountEmailAndPasswordForm(false);
        showCreateAccountPersonalInfoForm(false);
        showCreateAccountAddressInfoForm(true);
      }
    };

    const calcNextFormIndex = () => {
      let index = 0;
      if (emailAndPasswordFieldsValid()) {
        index += 1;
      }
      if (personalInfoFieldsValid()) {
        index += 1;
      }
      if (homeAddressFormValid()) {
        index += 1;
      }
      setFormIndex(index);
      return index;
    };
    const showLoginForm = () => {
      setShowEmailField(true);
      setShowPasswordField(true);
      setShowConfirmPasswordField(false);
      setShowPrevious(false);
      setIsCreatingAccount(false);
      setIsResettingPassword(false);
      setShowNextButton(false);
      setShowCreateAccountButton(true);
    };
    const showCreateAccountEmailAndPasswordForm = (value) => {
      setShowEmailField(value);
      setShowPasswordField(value);
      setShowConfirmPasswordField(value);
    };
    const showCreateAccountPersonalInfoForm = (value) => {
      setShowFirstNameField(value);
      setShowLastNameField(value);
      setShowDOBField(value);
      setShowPhoneNumberField(value);
    };
    const showCreateAccountAddressInfoForm = (value) => {
      setShowAddressLine1Field(value);
      setShowAddressLine2Field(value);
      setShowCityField(value);
      setShowHomeStateField(value);
      setShowZipField(value);
    };
    const handlPrevious = () => {
      let newIndex = calcNextFormIndex() - 1;
      setFormIndex(newIndex);
    };
    const personalInfoFieldsValid = () => {
      return (
        firstName !== undefined &&
        lastName !== undefined &&
        phoneNumber !== undefined &&
        dateOfBirth !== undefined
      );
    };
    const emailAndPasswordFieldsValid = () => {
      let result =
        emailInput !== undefined &&
        passwordInput !== undefined &&
        confirmPasswordInput !== undefined;
      console.log("result is: ", result);
      return result;
    };
    const homeAddressFormValid = () => {
      let result =
        addressLine1 !== undefined &&
        addressLine2 !== undefined &&
        city !== undefined &&
        homeState !== undefined &&
        zip !== undefined;
      return result;
    };
    const handleSubmit = (e) => {
      const firebaseAuth = getAuth();
      // setPersistence(firebaseAuth, firebase.auth.Auth.Persistence.NONE);
      clearErrors();
      setFirebaseValidationError();
      handleSubmitz(e);
      const hasValidationErrors = Object.keys(errorsz).length > 0;
      if (hasValidationErrors) {
        setIsLoading(false);
        return;
      }
      if (isCreatingAccount) {
        setIsLoading(true);
      } else {
        handleSubmitz(e);
        const hasValidationErrors = Object.keys(errorsz).length > 0;
        if (hasValidationErrors) {
          setIsLoading(false);
          return;
        }
        scrubbitAuth.signin(emailInput, passwordInput);
        history.push("/dashboard");
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
              {errorsz.email && <p className="error">{errorsz.email}</p>}
              {firebaseValidationError && (
                <p className="error">{firebaseValidationError}</p>
              )}
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
                {errorsz.password && (
                  <p className="error">{errorsz.password}</p>
                )}
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
            {showConfirmPasswordField ? (
              <div>
                <div className="mb-3">
                  {errorsz.confirmPassword && (
                    <p className="error">{errorsz.confirmPassword}</p>
                  )}
                  <input
                    className="form-control"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={
                      confirmPasswordInput ? confirmPasswordInput : undefined
                    }
                    onChange={(e) => {
                      setConfirmPasswordInput(e.target.value);
                      handleChangez("confirmPassword", null, e);
                    }}
                  />
                </div>
              </div>
            ) : (
              <div />
            )}
            {showFirstNameField ? (
              <div>
                <div className="mb-3">
                  {errorsz.confirmPassword && (
                    <p className="error">{errorsz.confirmPassword}</p>
                  )}
                  <input
                    className="form-control"
                    type="text"
                    name="firstname"
                    placeholder="First name"
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      handleChangez("firstname", null, e);
                    }}
                  />
                </div>
              </div>
            ) : (
              <div />
            )}
            {showLastNameField ? (
              <div>
                <div className="mb-3">
                  {errorsz.confirmPassword && (
                    <p className="error">{errorsz.confirmPassword}</p>
                  )}
                  <input
                    className="form-control"
                    type="text"
                    name="lastname"
                    placeholder="Last name"
                    onChange={(e) => {
                      setLastName(e.target.value);
                      handleChangez("lastname", null, e);
                    }}
                  />
                </div>
              </div>
            ) : (
              <div />
            )}
            {showDOBField ? (
              <div>
                <div className="mb-3">
                  {errorsz.confirmPassword && (
                    <p className="error">{errorsz.confirmPassword}</p>
                  )}
                  <input
                    className="form-control"
                    type={dateType}
                    name="dateofbirth"
                    placeholder="Date of birth"
                    onFocus={() => {
                      setDateType("date");
                    }}
                    onChange={(e) => {
                      setDateOfBirth(e.target.value);
                      handleChangez("dateOfBirth", null, e);
                    }}
                  />
                </div>
              </div>
            ) : (
              <div />
            )}
            {showAddressLine1Field ? (
              <div>
                <div className="mb-3">
                  {errorsz.confirmPassword && (
                    <p className="error">{errorsz.confirmPassword}</p>
                  )}
                  <input
                    className="form-control"
                    type="text"
                    name="addressLine1"
                    placeholder="Address Line 1"
                    onChange={(e) => {
                      setAddressLine1(e.target.value);
                      handleChangez("addressLine1", null, e);
                    }}
                  />
                </div>
              </div>
            ) : (
              <div />
            )}
            {showAddressLine2Field ? (
              <div>
                <div className="mb-3">
                  {errorsz.confirmPassword && (
                    <p className="error">{errorsz.confirmPassword}</p>
                  )}
                  <input
                    className="form-control"
                    type="text"
                    name="addressLine2"
                    placeholder="Address Line 2"
                    onChange={(e) => {
                      setAddressLine2(e.target.value);
                      handleChangez("addressLine2", null, e);
                    }}
                  />
                </div>
              </div>
            ) : (
              <div />
            )}
            {showCityField ? (
              <div>
                <div className="mb-3">
                  {errorsz.confirmPassword && (
                    <p className="error">{errorsz.confirmPassword}</p>
                  )}
                  <input
                    className="form-control"
                    type="text"
                    name="city"
                    placeholder="City"
                    onChange={(e) => {
                      setCity(e.target.value);
                      handleChangez("city", null, e);
                    }}
                  />
                </div>
              </div>
            ) : (
              <div />
            )}
            {showHomeStateField ? (
              <div>
                <div className="mb-3">
                  {errorsz.confirmPassword && (
                    <p className="error">{errorsz.confirmPassword}</p>
                  )}
                  <select
                    className="form-control"
                    name="homeState"
                    placeholder="State"
                    onChange={(e) => {
                      setHomeState(e.target.value);
                      handleChangez("homeState", null, e);
                    }}
                  >
                    <optgroup>
                      <option value="" disabled selected>
                        State
                      </option>
                      <option>GA</option>
                    </optgroup>
                  </select>
                </div>
              </div>
            ) : (
              <div />
            )}
            {showZipField ? (
              <div>
                <div className="mb-3">
                  {errorsz.confirmPassword && (
                    <p className="error">{errorsz.confirmPassword}</p>
                  )}
                  <input
                    className="form-control"
                    type="text"
                    name="zip"
                    placeholder="zip"
                    onChange={(e) => {
                      setZip(e.target.value);
                      handleChangez("zip", null, e);
                    }}
                  />
                </div>
              </div>
            ) : (
              <div />
            )}
            {showPhoneNumberField ? (
              <div>
                <div className="mb-3">
                  {errorsz.confirmPassword && (
                    <p className="error">{errorsz.confirmPassword}</p>
                  )}
                  <input
                    className="form-control"
                    type="text"
                    name="phoneNumber"
                    placeholder="Phone number"
                    required
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                      handleChangez("phoneNumber", null, e);
                    }}
                  />
                </div>
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
            {showCreateAccountButton ? (
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
            {showNextButton ? (
              <button
                className="btn btn-primary d-block w-100"
                type="button"
                onClick={(e) => {
                  handleNextForm(false);
                }}
              >
                Next
              </button>
            ) : (
              <div />
            )}
            {showPrevious ? (
              <a
                className="forgot"
                onClick={() => {
                  handlePreviousClicked();
                }}
              >
                Previous
              </a>
            ) : (
              <div />
            )}
            {showCancelButton ? (
              <a
                className="forgot"
                onClick={() => {
                  handleCancelClicked();
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
        {/* <div class="footer">
          <p>Footer</p>
        </div> */}
      </div>
    );
  };
  // ----End of login Landing
  function PrivateRoute({ children, ...rest }) {
    console.log("inside private route");

    let auth = useAuth();
    let firebaseAuth = getAuth();
    console.log("calling auth.user, result is: ", auth.user);
    console.log("Firebase auth: ", firebaseAuth);
    return (
      <Route
        {...rest}
        render={({ location }) =>
          auth.user || localStorage.getItem("user") ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: location },
              }}
            />
          )
        }
      />
    );
  }

  return (
    <ProvideAuth>
      <Router>
        <div>
          {/* <AuthButton /> */}

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <PrivateRoute path="/getService">
              <SelectScrubber />
            </PrivateRoute>
            <Route path="/about">
              <AppNavBar storage={storage} auth={firebaseAuth} />
              <About />
            </Route>
            <Route path="/verification">
              <EmailVerification />
            </Route>
            <Route path="/createAccount">
              <CreateAccount
                storage={storage}
                firebaseAuth={firebaseAuth}
                auth={auth}
              />
            </Route>
            <PrivateRoute path="/editProfile">
              <AppNavBar storage={storage} auth={firebaseAuth} />
              <EditProfile storage={storage} auth={firebaseAuth} />
            </PrivateRoute>
            <PrivateRoute path="/dashboard">
              <AppNavBar storage={storage} auth={firebaseAuth} />
              <Dashboard />
            </PrivateRoute>
            <PrivateRoute path="/contact">
              <AppNavBar storage={storage} auth={firebaseAuth} />
              <Contact />
            </PrivateRoute>
            <Route path="/">
              <Landing />
            </Route>
          </Switch>
        </div>
      </Router>
    </ProvideAuth>
  );
}

export default App;

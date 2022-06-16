import React, {
  useEffect,
  useState,
  useContext,
  createContext,
  useRef,
} from "react";
import "./App.css";
import "./Login-Form-Clean.css";
import "./bootstrap.min.css";
import "../src/fonts/ionicons.min.css";
import CreateAccount from "./container/Landing/CreateAccount/CreateAccount";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import FacebookLogin from "react-facebook-login";
// import { Card, Image } from 'react-bootstrap';
import Dashboard from "../src/container/Dashboard/Dashboard.jsx";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import EditProfile from "../src/container/EditProfile/EditProfile.jsx";
import SelectScrubber from "./container/OnDemand/SelectScrubber.jsx";
import AppNavBar from "./component/AppNavBar/AppNavBar";
import About from "./container/About";
import Contact from "./container/Contact/Contact";
import { useForm } from "./helpers/validation/useForm";
import { firebaseErrorConstants } from "./helpers/firebaseErrorConstants";
import { auth } from "firebaseui";
function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyDfDJ5iGlPm38EQpGd_moFi_dq_GXEfiSo",
    authDomain: "scrubbit-dev-336218.firebaseapp.com",
    databaseURL: "https://scrubbit-dev-336218-default-rtdb.firebaseio.com",
    projectId: "scrubbit-dev-336218",
    storageBucket: "scrubbit-dev-336218.appspot.com",
    messagingSenderId: "62654367990",
    appId: "1:62654367990:web:53198f68ebb3fedb6804d7",
    measurementId: "G-0QL4B38S3S",
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const storage = getStorage();
  // const picRef = ref(storage);
  const firebaseAuth = getAuth();

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
    let auth = useAuth();
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
    const [
      createAccountProcessInitiated,
      setCreateAccountProcessInitiated,
    ] = useState(false);
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

    const createAccount = (e) => {
      setIsLoading(true);
      let newAccountData = {
        email: emailInput,
        password: passwordInput,
        confirmPassword: confirmPasswordInput,
        username: usernameInput,
      };
      if (isCreatingAccount) {
        handleSubmitz(e);
        const hasValidationErrors = Object.keys(errorsz).length > 0;
        if (hasValidationErrors) {
          setIsLoading(false);
          return;
        }
        createUserWithEmailAndPassword(getAuth(), emailInput, passwordInput)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // ...
            auth.signin((user) => {
              history.replace(from);
              history.push("/dashboard");
              setIsLoading(true);
              localStorage.setItem("user", JSON.stringify(user));
            }, user);
          })
          .catch((error) => {
            const errorCode = error.code;
            console.log(
              "An error occurred while attempting to create account..."
            );
            console.log("Error is: ");
            console.log("Error code: ", errorCode);
            console.log("Error message: ", error.message);
            if (
              error.errorCode === firebaseErrorConstants.EMAIL_ALREADY_IN_USE
            ) {
              setFirebaseValidationError(
                "An account with that email already exists"
              );
            } else {
              setFirebaseValidationError("Invalid email or password");
            }
          });
      }
      setIsLoading(false);
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
        createUserWithEmailAndPassword(auth, emailInput, passwordInput)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // ...
            console.log("calling auth.signin");
            // auth.signin((user) => {
            //   console.log("inside callback");
            //   history.replace(from);
            //   history.push("/dashboard");
            //   setIsLoading(false);
            //   localStorage.setItem("user", JSON.stringify(user));
            // }, user);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            setIsLoading(false);
          });
      } else {
        handleSubmitz(e);
        const hasValidationErrors = Object.keys(errorsz).length > 0;
        if (hasValidationErrors) {
          setIsLoading(false);
          return;
        }
        signInWithEmailAndPassword(firebaseAuth, emailInput, passwordInput)
          .then((userCredential) => {
            setIsLoading(true);
            // Signed in
            console.log(
              "signing in with email: ",
              emailInput,
              ", password: ",
              passwordInput
            );
            const user = userCredential.user;
            // ...
            console.log("calling auth.signin");
            auth.signin((user) => {
              console.log("inside callback");
              history.replace(from);
              history.push("/dashboard");
              localStorage.setItem("user", JSON.stringify(user));
            }, user);
            setIsLoading(false);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if (errorCode === "auth/wrong-password") {
              setFirebaseValidationError("Invalid email or password");
            } else {
              setFirebaseValidationError(
                "An error occured during authentication..."
              );
            }
            setTimeout(() => {
              console.log("An error occured during authentication....");
              setIsLoading(false);
            }, 3000);
          });
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
            <h6 style={{ color: "gray", textAlign: "center" }}>
              Mobile Car Wash
            </h6>
            <div className="illustration">
              <i className="icon ion-waterdrop"></i>
            </div>
            <div className="mb-3">
              {errorsz.email && <p className="error">{errorsz.email}</p>}
              {firebaseValidationError && (
                <p className="error">{firebaseValidationError}</p>
              )}
              <input
                className="form-control"
                type="email"
                name="email"
                placeholder="Email"
                onChange={(e) => {
                  setEmailInput(e.target.value);
                  handleChangez("email", null, e);
                }}
              />
            </div>
            {!isResettingPassword ? (
              <div className="mb-3">
                {errorsz.password && (
                  <p className="error">{errorsz.password}</p>
                )}
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    handleChangez("password", null, e);
                  }}
                />
              </div>
            ) : (
              <div />
            )}
            {isCreatingAccount ? (
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
            {!isResettingPassword && !createAccountProcessInitiated ? (
              <button
                className="btn btn-primary d-block w-100"
                type="button"
                onClick={(e) => {
                  console.log("onClick!");
                  setIsCreatingAccount(true);
                  setCreateAccountProcessInitiated(true);
                  createAccount(e);
                }}
              >
                Create Account
              </button>
            ) : (
              <div />
            )}
            {createAccountProcessInitiated ? (
              <button
                className="btn btn-primary d-block w-100"
                type="button"
                onClick={(e) => {
                  console.log("onClick!");
                  setIsCreatingAccount(true);
                  createAccount(e);
                }}
              >
                Next
              </button>
            ) : (
              <div />
            )}
            {isCreatingAccount || isResettingPassword ? (
              <a
                className="forgot"
                onClick={() => {
                  setIsCreatingAccount(false);
                  setIsResettingPassword(false);
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
  const authContext = createContext();
  function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
  }
  function useAuth() {
    return useContext(authContext);
  }
  function useProvideAuth() {
    const [user, setUser] = useState(null);
    const signin = (cb, userArg) => {
      return fakeAuth.signin((user) => {
        console.log("in fakeAuth.signin");
        setUser(userArg);
        cb(userArg);
      }, userArg);
    };

    const signout = (cb) => {
      return fakeAuth.signout(() => {
        setUser(null);
        cb();
      });
    };

    return {
      user,
      signin,
      signout,
    };
  }
  const fakeAuth = {
    isAuthenticated: false,
    signin(cb, user) {
      if (user) {
        fakeAuth.isAuthenticated = true;
        setTimeout(cb, 1000); // fake async
      } else {
        fakeAuth.isAuthenticated = false;
        setTimeout(cb, 1000); // fake async
      }
    },
    signout(cb) {
      fakeAuth.isAuthenticated = false;
      setTimeout(cb, 1000);
    },
  };

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
            <Route path="/createAccount">
              <CreateAccount />
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

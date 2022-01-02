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
import FacebookLogin from "react-facebook-login";
// import { Card, Image } from 'react-bootstrap';
import Dashboard from "../src/container/Dashboard/Dashboard.jsx";
import speck from "../src/container/Landing/speck1.png";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

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
    const [usernameInput, setUsernameInput] = useState();
    const [passwordInput, setPasswordInput] = useState();

    const [isLoading, setIsLoading] = useState(false);

    const showLoader = () => {
      console.log("inside showLoader");
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
    // useEffect(() => {
    //   // GET request using fetch inside useEffect React hook
    //   fetch(
    //     "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
    //   ).then((response) => {
    //     console.log(response);
    //   });
    // }, []);
    const [usernameStyle, setUsernameStyle] = useState({});
    const [passwordStyle, setPasswordStyle] = useState({});

    const handleSubmit = () => {
      console.log("calling handleSubmit");
      setIsLoading(true);
      const firebaseAuth = getAuth();
      signInWithEmailAndPassword(firebaseAuth, usernameInput, passwordInput)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
          auth.signin(() => {
            console.log("inside callback");
            history.replace(from);
            history.push("/dashboard");
            const auth = getAuth();
            setIsLoading(false);
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    };

    const validatePassword = (input) => {
      console.log("Validating password", input);
      if (input.length > 5) {
        console.log("Changing style, password");
        setPasswordStyle({ border: "1px solid green" });
      } else if (input.length < 5 && input.length > 0) {
        setPasswordStyle({ border: "1px solid red" });
      } else if (input.length == 0) {
        setPasswordStyle({});
      }
    };

    const validateUsername = (field) => {
      console.log("Validating username");
      if (field.length > 5) {
        setUsernameStyle({ border: "1px solid green" });
      } else if (field.length < 5 && field.length > 0) {
        setUsernameStyle({ border: "1px solid red" });
      } else if (field.length == 0) {
        setUsernameStyle({});
      }
    };

    return isLoading ? (
      showLoader()
    ) : (
      <div className="container full-height">
        {/* <div className="row flex center v-center full-height">
          <div className="col-8 col-sm-4">
            <div className="form-box">
              <form>
                <fieldset>
                  <legend>Sign in</legend>
                  <img
                    id="avatar"
                    className="avatar round"
                    src={speck}
                    alt="Scrubz"
                  />
                  <hr></hr>
                  <input
                    className="form-control"
                    type="email"
                    id="username"
                    name="email"
                    placeholder="email"
                    onChange={(e) => {
                      validateUsername(e.target.value);
                      setUsernameInput(e.target.value);
                      console.log("usernameInput var is: ", usernameInput);
                    }}
                    style={usernameStyle}
                  />
                  <br></br>
                  <input
                    className="form-control"
                    type="password"
                    id="password"
                    name="password"
                    placeholder="password"
                    onChange={(e) => {
                      validatePassword(e.target.value);
                      setPasswordInput(e.target.value);
                      console.log("passwordInput is: ", passwordInput);
                    }}
                    style={passwordStyle}
                  />
                  <Link to="/createAccount"> Create Account</Link>
                  <div id="fb-root"></div>
                  <button
                    className="btn btn-primary btn-block"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Login
                  </button>
                  <br></br>
                </fieldset>
              </form>
            </div>
          </div>
        </div> */}
        {/* <div className="container">
          <div>
            {!loggedin && (
              <FacebookLogin
                appId="312484227447285"
                // autoLoad={true}
                fields="name,email,picture"
                scope="public_profile"
                callback={responseFacebook}
                icon="fa-facebook"
              />
            )}
            {loggedin && (
              <div>
                <img src={picture} roundedCircle />
              </div>
            )}
          </div>
          <div>
            {loggedin && (
              <div>
                <div>{data.name}</div>
                <div>{data.email}</div>
              </div>
            )}
          </div>
        </div> */}
        {/* <div>
          <button onClick={signout}>sign out</button>
        </div> */}
        <section class="login-clean">
          <form>
            <h1 style={{ color: "gray", textAlign: "center" }}>Scrubbit</h1>
            <div class="illustration">
              <i class="icon ion-waterdrop"></i>
            </div>
            <div class="mb-3">
              <input
                class="form-control"
                type="email"
                name="email"
                placeholder="Email"
                onChange={(e) => {
                  validateUsername(e.target.value);
                  setUsernameInput(e.target.value);
                  console.log("usernameInput var is: ", usernameInput);
                }}
              />
            </div>
            <div class="mb-3">
              <input
                class="form-control"
                type="password"
                name="password"
                placeholder="Password"
                onChange={(e) => {
                  validatePassword(e.target.value);
                  setPasswordInput(e.target.value);
                  console.log("passwordInput is: ", passwordInput);
                }}
              />
            </div>
            <div class="mb-3">
              <button
                class="btn btn-primary d-block w-100"
                type="button"
                onClick={handleSubmit}
              >
                Log In
              </button>
            </div>
            <a class="forgot" href="#">
              Forgot your email or password?
            </a>
          </form>
        </section>
        <script src="assets/bootstrap/js/bootstrap.min.js"></script>
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

    const signin = (cb) => {
      return fakeAuth.signin(() => {
        console.log("in fakeAuth.signin");
        setUser("user");
        cb();
      });
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
    signin(cb) {
      fakeAuth.isAuthenticated = true;
      setTimeout(cb, 1000); // fake async
    },
    signout(cb) {
      fakeAuth.isAuthenticated = false;
      setTimeout(cb, 1000);
    },
  };

  // function AuthButton() {
  //   let history = useHistory();
  //   let auth = useAuth();

  //   return auth.user ? (
  //     <p>
  //       Welcome!{" "}
  //       <button
  //         onClick={() => {
  //           auth.signout(() => history.push("/"));
  //         }}
  //       >
  //         Sign out
  //       </button>
  //     </p>
  //   ) : (
  //     <p>You are not logged in.</p>
  //   );
  // }

  function PrivateRoute({ children, ...rest }) {
    console.log("inside private route");

    let auth = useAuth();
    return (
      <Route
        {...rest}
        render={({ location }) =>
          auth.user ? (
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
            <Route path="/createAccount">
              <CreateAccount />
            </Route>
            <PrivateRoute path="/dashboard">
              <Dashboard />
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

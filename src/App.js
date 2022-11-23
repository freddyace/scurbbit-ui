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
import Landing from "./container/Landing/Landing";
import { useForm } from "./helpers/validation/useForm";
import { firebaseErrorConstants } from "./helpers/firebaseErrorConstants";
import { auth } from "firebaseui";
import { useAuth, ProvideAuth } from "./helpers/context/useAuth.jsx";
import EmailVerification from "./container/Landing/CreateAccount/Verification/EmailVerification";
import { getDatabase } from "firebase/database";

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
  const scrubbitDatabase = getDatabase(app);
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
                database={scrubbitDatabase}
              />
            </Route>
            <PrivateRoute path="/editProfile">
              <AppNavBar storage={storage} auth={firebaseAuth} />
              <EditProfile
                storage={storage}
                auth={firebaseAuth}
                database={scrubbitDatabase}
              />
            </PrivateRoute>
            <PrivateRoute path="/dashboard">
              <AppNavBar
                storage={storage}
                auth={firebaseAuth}
                database={scrubbitDatabase}
              />
              <Dashboard />
            </PrivateRoute>
            <PrivateRoute path="/contact">
              <AppNavBar storage={storage} auth={firebaseAuth} />
              <Contact database={scrubbitDatabase} />
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

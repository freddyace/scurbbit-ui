import React, { useEffect, useState } from "react";
import "../../App.css";
import "../../assets/bootstrap/css/bootstrap.min.css";
import "./Landing.css";
import speck from "./speck1.png";
import "../Landing/styles.css";
import { Link } from "react-router-dom";
import FacebookLogin from "react-facebook-login";
import { Redirect, useHistory } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const Landing = () => {
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDfDJ5iGlPm38EQpGd_moFi_dq_GXEfiSo",
    authDomain: "scrubbit-dev-336218.firebaseapp.com",
    projectId: "scrubbit-dev-336218",
    storageBucket: "scrubbit-dev-336218.appspot.com",
    messagingSenderId: "62654367990",
    appId: "1:62654367990:web:95bb2cc806590e0c6804d7",
    measurementId: "G-JN132NMEGS",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  const [loggedin, setLoggedin] = useState(false);
  const [data, setData] = useState({});
  const [picture, setPicture] = useState("");

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
    // GET request using fetch inside useEffect React hook
    fetch(
      "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
    ).then((response) => {
      console.log(response);
    });
  }, []);
  const [test, setTest] = useState("yo");
  const [usernameStyle, setUsernameStyle] = useState({});
  const [passwordStyle, setPasswordStyle] = useState({});

  const handleSubmit = (event) => {
    console.log(event.target.username.value);
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

  return (
    <div className="container full-height">
      <div className="row flex center v-center full-height">
        <div className="col-8 col-sm-4">
          <div className="form-box">
            <form onSubmit={handleSubmit}>
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
                  }}
                  style={passwordStyle}
                />
                <Link to="/createAccount"> Create Account</Link>
                <div id="fb-root"></div>
                <button className="btn btn-primary btn-block" type="submit">
                  Login
                </button>
                <br></br>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
      <div class="container">
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
      </div>
      <div>
        <button onClick={signout}>sign out</button>
      </div>
    </div>
  );
};
export default Landing;

import React, { useEffect, useState } from "react";
import "../../App.css";
import "../../assets/bootstrap/css/bootstrap.min.css";
import "./Landing.css";
import speck from "./speck1.png";
import "../Landing/styles.css";

const Landing = () => {
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

  const handleClick = () => {
    console.log("clicked");
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
                <a href="#">Create an account</a>
                {/* <div>{test}</div> */}
                <button
                  className="btn btn-primary btn-block"
                  type="button"
                  onClick={handleClick}
                >
                  Login
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Landing;

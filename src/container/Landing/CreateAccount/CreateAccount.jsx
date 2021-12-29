import speck from "../../Landing/speck1.png";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import usersDB from "../../../database/users.json";
import { useEffect, useState } from "react";
const CreateAccount = () => {
  const [users, setUsers] = useState(usersDB);
  useEffect(() => {
    console.log(usersDB);
    setUsers(usersDB);
  });

  const userExists = (user) => {
    console.log("checking if ", user, " exists...");
    return false;
  };

  const authenticate = (user) => {
    console.log("Authenticating user");
    userExists(user);
  };

  const handleSubmit = (event) => {
    console.log("Handling form submission");
    event.preventDefault();
    authenticate(event.target.user);
  };

  return (
    <body>
      <div>
        <div class="container full-height">
          <div class="row flex center v-center full-height">
            <div class="col-8 col-sm-4">
              <div class="form-box">
                <form onSubmit={handleSubmit}>
                  <fieldset>
                    <legend>Sign in</legend>
                    <img id="avatar" class="avatar round" src={speck} />
                    {/* <div
                      class="alert alert-success"
                      role="alert"
                    >
                      <span>
                        <strong>Alert</strong> text.
                      </span>
                    </div> */}
                    <input
                      class="form-control"
                      type="text"
                      id="username"
                      name="firstname"
                      placeholder="First Name"
                    />
                    <input
                      class="form-control"
                      type="text"
                      id="username-2"
                      name="lastname"
                      placeholder="Last Name"
                    />
                    <input
                      class="form-control"
                      type="email"
                      id="username-1"
                      name="email"
                      placeholder="email"
                    />
                    <input
                      class="form-control"
                      type="password"
                      id="password"
                      name="password"
                      placeholder="password"
                    />
                    <input
                      class="form-control"
                      type="password"
                      id="password-1"
                      name="confirm-password"
                      placeholder="confirm password"
                    />
                    <Link to="/">Cancel</Link>
                    <button class="btn btn-primary btn-block" type="submit">
                      Create Account
                    </button>
                  </fieldset>
                </form>
              </div>
              <br></br>
            </div>
          </div>
        </div>
        <script src="assets/js/jquery.min.js"></script>
        <script src="assets/bootstrap/js/bootstrap.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/lightpick@1.3.4/lightpick.min.js"></script>
        <script src="assets/js/Date-Range-Picker.js"></script>
        <script src="assets/js/Bootstrap-DateTime-Picker-1.js"></script>
        <script src="assets/js/Bootstrap-DateTime-Picker-2.js"></script>
        <script src="assets/js/Bootstrap-DateTime-Picker.js"></script>
        <script src="assets/js/Contact-Form-v2-Modal--Full-with-Google-Map.js"></script>
      </div>
    </body>
  );
};

export default CreateAccount;

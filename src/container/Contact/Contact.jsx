import React, { useState, useEffect } from "react";
import "./stylesheet.css";
import { useAuth } from "../../helpers/context/useAuth.jsx";
import { getDatabase, push, ref as dbRef, onValue } from "firebase/database";
import { useHistory } from "react-router-dom";

const Contact = (props) => {
  let history = useHistory();
  const db = getDatabase();
  const scrubbitAuth = useAuth();
  const [userFirstname, setUserFirstName] = useState(null);
  const [userLastname, setUserLastName] = useState(null);
  const [county, setCounty] = useState(null);
  const [state, setState] = useState(null);
  const database = getDatabase();
  const [email, setEmail] = useState();
  const [message, setMessage] = useState();

  const handleChange = (event) => {
    console.log(event.target.value);
  };
  const handleCountyChange = (event) => {
    console.log(event.target.value);
  };

  useEffect(() => {}, []);
  useEffect(() => {
    const userId = props?.auth?.currentUser.uid;
    return onValue(
      dbRef(db, "users/" + userId),
      (snapshot) => {
        console.log("snapshot: ", snapshot);
        console.log("snapshot.val: ", snapshot.val());
        const firstname = (snapshot.val() && snapshot.val().firstName) || "N/A";
        setUserFirstName(firstname);
        const lastname = (snapshot.val() && snapshot.val().lastName) || "N/A";
        setUserLastName(lastname);
        const email = (snapshot.val() && snapshot.val().email) || "N/A";
        setEmail(email);
        const homeState = (snapshot.val() && snapshot.val().state) || "N/A";
        setState(homeState);
        const homeStateCounty =
          (snapshot.val() && snapshot.val().county) || "N/A";
        setCounty(homeStateCounty);
      },
      {
        onlyOnce: true,
      }
    );
  });
  return (
    <div>
      <div>
        <div class="col p-0 m-0">
          <div class="col align-self-center p-4 m-4 text-body">
            <h1 class="display-5">
              <i class="fa fa-envelope"></i>&nbsp;Message Us
            </h1>
            <h6 class="mt-3">
              Customers are the priority here at Scrubbit. If you need to
              contact us for any reason, please fill out the form below with
              your message and a team member will reach out to you as soon as
              possible.
            </h6>
          </div>
          <div class="col-12 col-md-6 p-0 m-0">
            <img class="img-fluid" />
          </div>
        </div>
        <textarea
          id="message"
          onChange={(e) => {
            setMessage(e.target.value);
            console.log("message: ", message);
          }}
        ></textarea>

        <button
          className="btn btn-primary d-block w-100"
          type="button"
          style={{
            border: "none",
            background: "linear-gradient(120deg, #00e4d0, #5983e8)",
          }}
          onClick={() => {
            const obj = {
              firstname: userFirstname,
              lastname: userLastname,
              email: email,
              message: message,
              state: state,
              county: county,
            };
            // const obj2 = {firstname: }
            console.log(JSON.stringify(obj));
            const db = getDatabase();
            push(
              dbRef(db, "customer_inquiry/" + props?.auth?.currentUser.uid),
              obj
            ).then(history.push("/messageSent"));
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Contact;

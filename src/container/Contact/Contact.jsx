import React, { useState, useEffect } from "react";
import "./stylesheet.css";
import { useAuth } from "../../helpers/context/useAuth.jsx";
import { getDatabase, set, ref as dbRef, onValue } from "firebase/database";

const Contact = (props) => {
  const db = getDatabase();
  const scrubbitAuth = useAuth();
  const [userFirstname, setUserFirstName] = useState(null);
  const [userLastname, setUserLastName] = useState(null);
  const [county, setCounty] = useState(null);
  const [state, setState] = useState(null);
  const database = getDatabase();
  const [email, setEmail] = useState();


  const handleChange = (event) => {
    console.log(event.target.value);
  };
  const handleCountyChange = (event) => {
    console.log(event.target.value);
  };

  useEffect(() => {
    const getUserData = () => {
      console.log(props?.auth?.currentUser.uid)
      const userId = props?.auth?.currentUser.uid;
      return onValue(dbRef(db, 'users/' + userId), (snapshot) => {
        console.log("snapshot: ", snapshot)
        console.log("snapshot.val: ", snapshot.val())
        const firstname = (snapshot.val() && snapshot.val().firstName) || 'N/A';
        setUserFirstName(firstname);
        const lastname = (snapshot.val() && snapshot.val().lastName) || 'N/A';
        setUserLastName(lastname);
        const email = (snapshot.val() && snapshot.val().email) || 'N/A';
        setEmail(email);
      }, {
        onlyOnce: true
      });
    }
  });
  return (
    <div>
      <div className="contact">
        <p>
          Customers are the priority here at Scrubbit. If you need to contact us
          for any reason, please fill out the form below and a team member will
          reach out to you as soon as possible.
        </p>
        <label for="message">Message</label>
        <textarea id="message"></textarea>

        <button
        
          onClick={() => {
            const obj = {
              firstname: "Sarah", lastname: "Campbell",
              email: "scampbell002@emai.com", 
              message: "I placed and order and the scrubber never showed up. I need a refund, threre is no way to do this in the app." ,
              state: "GA",
              county: "Henry"
            };
            // const obj2 = {firstname: }
            console.log(JSON.stringify(obj));
            const db = getDatabase();
            set(dbRef(db, "customer_inquiry"), obj);
          }}
        >Submit</button>
      </div>
    </div>
  );
};

export default Contact;

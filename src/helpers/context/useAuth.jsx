import React, {
  useEffect,
  useState,
  useContext,
  createContext,
  useRef,
} from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";
import { auth } from "firebaseui";
import { initializeApp } from "firebase/app";

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

const app = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(app);
const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
export function useAuth() {
  return useContext(authContext);
}

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [firebaseValidationError, setFirebaseValidationError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const signin = (emailInput, passwordInput) => {
    signInWithEmailAndPassword(firebaseAuth, emailInput, passwordInput)
      .then((userCredential) => {
        //setIsLoading(true);
        // Signed in
        console.log(
          "signing in with email: ",
          emailInput,
          ", password: ",
          passwordInput
        );
        setUser(userCredential.user);
        console.log("inside callback");
        //history.replace(from);
        localStorage.setItem("user", JSON.stringify(user));
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
  };

  const signout = () => {
    signOut();
  };
  const signup = (emailInput, passwordInput) => {
    createUserWithEmailAndPassword(firebaseAuth, emailInput, passwordInput)
      .then((userCredential) => {
        // Signed in
        setUser(userCredential.user);
        // ...
        console.log("calling auth.signin");
        console.log("inside callback");
        localStorage.setItem("user", JSON.stringify(userCredential.user));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        setIsLoading(false);
      });
  };

  return {
    user,
    signin,
    signout,
    signup,
  };
}
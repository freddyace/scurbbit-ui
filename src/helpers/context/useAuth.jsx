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
  sendEmailVerification,
  applyActionCode,
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
  const signin = (callback, emailInput, passwordInput) => {
    signInWithEmailAndPassword(firebaseAuth, emailInput, passwordInput)
      .then((userCredential) => {
        if (!userCredential?.user?.emailVerified) {
          console.log("Email is not verified, exiting");
          setFirebaseValidationError(
            "Please verify your email address before signing in."
          );
          signOut(firebaseAuth);
          return;
        }
        console.log("Email is verified!");
        setUser(userCredential.user);
        console.log("inside callback");
        //history.replace(from);
        localStorage.setItem("user", JSON.stringify(user));
        setIsLoading(false);
        callback();
      })
      .catch((error) => {
        console.log("error is: ", error);
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
        //setUser(userCredential.user);
        // ...
        console.log("Successfully created user");
        const actionCodeSettings = {
          url: "https://scrubbit-dev-336218.web.app",
          // iOS: {
          //   bundleId: "com.example.ios",
          // },
          // android: {
          //   packageName: "com.example.android",
          //   installApp: true,
          //   minimumVersion: "12",
          // },
          handleCodeInApp: false,
        };
        console.log("url is: ", actionCodeSettings.url);
        sendEmailVerification(userCredential.user, actionCodeSettings);
        //applyActionCode();
        //localStorage.setItem("user", JSON.stringify(userCredential.user));
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
    firebaseValidationError,
    signin,
    signout,
    signup,
  };
}

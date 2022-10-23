import React, {
  useEffect,
  useState,
  useContext,
  createContext,
  useRef,
} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";
import { useForm } from "../../../helpers/validation/useForm";
// import { auth } from "firebaseui";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import Spinner from "../../../component/loader/Spinner.jsx";
import { firebaseErrorConstants } from "../../../helpers/firebaseErrorConstants";
import "./Terms.css";
import { useAuth } from "../../../helpers/context/useAuth.jsx";

const CreateAccount = (props) => {
  const Landing = () => {
    const [data, setData] = useState({});
    const [picture, setPicture] = useState("");
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    let history = useHistory();
    let firebaseAuth = props.firebaseAuth;
    const auth = useAuth();
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
    const [showNextButton, setShowNextButton] = useState(false);
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [dateOfBirth, setDateOfBirth] = useState();
    const [addressLine1, setAddressLine1] = useState();
    const [addressLine2, setAddressLine2] = useState();
    const [city, setCity] = useState();
    const [homeState, setHomeState] = useState();
    const [zip, setZip] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [dateType, setDateType] = useState("text");
    const [showPrevious, setShowPrevious] = useState(false);
    const [showCreateAccountButton, setShowCreateAccountButton] = useState(
      true
    );
    const [showCancelButton, setShowCancelButton] = useState(false);
    const [showEmailField, setShowEmailField] = useState(true);
    const [showPasswordField, setShowPasswordField] = useState(true);
    const [showConfirmPasswordField, setShowConfirmPasswordField] = useState(
      true
    );
    const [showFirstNameField, setShowFirstNameField] = useState(false);
    const [showLastNameField, setShowLastNameField] = useState(false);
    const [showDOBField, setShowDOBField] = useState(false);
    const createAccountProgressBarArray = [
      "emailAndpassword",
      "personalInfo",
      "address",
    ];
    const [showAddressLine1Field, setShowAddressLine1Field] = useState(false);
    const [showAddressLine2Field, setShowAddressLine2Field] = useState(false);
    const [showCityField, setShowCityField] = useState(false);
    const [showHomeStateField, setShowHomeStateField] = useState(false);
    const [showZipField, setShowZipField] = useState(false);
    const [showPhoneNumberField, setShowPhoneNumberField] = useState(false);
    const [formIndex, setFormIndex] = useState(0);
    const [emailError, setEmailError] = useState();
    const [passwordError, setPasswordError] = useState();
    const [confirmPasswordError, setConfirmPasswordError] = useState();
    const [firstNameError, setFirstNameError] = useState();
    const [lastNameError, setLastnameError] = useState();
    const [dateOfBirthError, setDateOfBirthError] = useState();
    const [phoneNumberError, setPhoneNumberError] = useState();
    const [showTerms, setShowTerms] = useState(false);
    const [checkboxChecked, setCheckboxChecked] = useState(false);

    const setAndSaveFormIndex = (index) => {
      console.log("saving the current index: ", index);
      sessionStorage.setItem("scai", index);
      setFormIndex(index);
    };
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

    useEffect(() => {
      sessionStorage.setItem("scai", formIndex);
    });

    // useEffect(() => {
    //   handleNextForm();
    // }, [errorsz]);

    const handleCancelClicked = () => {
      history.push("/");
    };
    const handlePreviousClicked = () => {
      setIsCreatingAccount(false);
      setIsResettingPassword(false);
      setShowNextButton(false);
      handleNextForm(true);
    };

    const getFormByIndex = (index) => {
      if (index == 0) {
        setShowPrevious(false);
        showCreateAccountEmailAndPasswordForm(true);
        showCreateAccountAddressInfoForm(false);
        showCreateAccountPersonalInfoForm(false);
        setShowCancelButton(true);
        setShowCreateAccountButton(false);
        setAndSaveFormIndex(index);
      } else if (index == 1) {
        setShowPrevious(true);
        showCreateAccountEmailAndPasswordForm(false);
        showCreateAccountAddressInfoForm(false);
        showCreateAccountPersonalInfoForm(true);
        setAndSaveFormIndex(index);
      } else if (index == 2) {
        setShowPrevious(true);
        showCreateAccountEmailAndPasswordForm(false);
        showCreateAccountPersonalInfoForm(false);
        showCreateAccountAddressInfoForm(true);
        setAndSaveFormIndex(index);
      } else if (index == 3) {
        setShowPrevious(true);
        showCreateAccountEmailAndPasswordForm(false);
        showCreateAccountPersonalInfoForm(false);
        showCreateAccountAddressInfoForm(false);
        setShowTerms(true);
        setAndSaveFormIndex(index);
      }
    };

    const emailIsValid = (email) => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const resetErrorMessages = () => {
      setEmailError();
      setFirebaseValidationError();
      setPasswordError();
      setConfirmPasswordError();
    };
    const getValidationErrors = () => {
      resetErrorMessages();
      const currentIndex = parseInt(sessionStorage.getItem("scai"));
      const errors = [];
      switch (currentIndex) {
        case 0: {
          if (emailInput === undefined || emailInput === null) {
            // errorsz.email = "Email address is required.";
            setEmailError("Email address is required");
            errors.push("Email address is required.");
          } else if (!emailIsValid(emailInput)) {
            // errorsz.email = "Email address is invalid";
            errors.push("Email address is invalid");
            setEmailError("Email address is invalid");
          } else if (passwordInput === undefined || passwordInput === null) {
            // errorsz.password = "Password is required";
            setPasswordError("Password is required");
            errors.push("Password is required");
          } else if (passwordInput.length < 9) {
            // errorsz.password = "Password must contain at least 9 characters.";
            setPasswordError("Password must contain at least 9 characters");
            errors.push("Password must contain at least 9 characters.");
          } else if (passwordInput !== confirmPasswordInput) {
            // errorsz.confirmPassword =
            setConfirmPasswordError(
              "Password and confirm password do not match."
            );
            errors.push("Password and confirm password do not match.");
          }
          break;
        }
        case 1: {
          if (firstName === undefined || firstName === null) {
            setFirstNameError("First name is required.");
            errors.push("First name is required.");
          } else if (lastName === undefined || lastName === null) {
            setLastnameError("Last name is required.");
            errors.push("Last name is required.");
          } else if (dateOfBirth === undefined || dateOfBirth === null) {
            setDateOfBirthError("Date of birth is required.");
            errors.push("Date of birth is required.");
          } else if (phoneNumber === undefined || phoneNumber === null) {
            setPhoneNumberError("Phone number is required");
            errors.push("Phone number is required");
          }
          break;
        }
      }
      return errors;
    };

    const displayValidationErrors = (validationErrors) => {};

    const handleNextForm = () => {
      let index = parseInt(sessionStorage.getItem("scai"));
      //Need to validate first before going to this
      // handleSubmitz();
      // const hasValidationErrors = Object.keys(errorsz).length > 0;
      const validationErrors = getValidationErrors();
      const hasValidationErrors = validationErrors.length > 0;
      if (!hasValidationErrors) {
        index = index + 1;
      }
      getFormByIndex(index);
    };

    useEffect(() => {}, [errorsz]);
    const showLoginForm = () => {
      setShowEmailField(true);
      setShowPasswordField(true);
      setShowConfirmPasswordField(false);
      setShowPrevious(false);
      setIsCreatingAccount(false);
      setIsResettingPassword(false);
      setShowNextButton(false);
      setShowCreateAccountButton(true);
    };
    const showCreateAccountEmailAndPasswordForm = (value) => {
      setShowEmailField(value);
      setShowPasswordField(value);
      setShowConfirmPasswordField(value);
    };
    const showCreateAccountPersonalInfoForm = (value) => {
      setShowFirstNameField(value);
      setShowLastNameField(value);
      setShowDOBField(value);
      setShowPhoneNumberField(value);
    };
    const showCreateAccountAddressInfoForm = (value) => {
      setShowAddressLine1Field(value);
      setShowAddressLine2Field(value);
      setShowCityField(value);
      setShowHomeStateField(value);
      setShowZipField(value);
    };
    const handlePrevious = () => {
      let index = parseInt(sessionStorage.getItem("scai"));
      console.log("index is: ", index);
      index = index - 1;
      console.log("index is now: ", index);
      //Need to validate first before going to this
      getFormByIndex(index);
    };
    const personalInfoFieldsValid = () => {
      return (
        firstName !== undefined &&
        lastName !== undefined &&
        phoneNumber !== undefined &&
        dateOfBirth !== undefined
      );
    };
    const emailAndPasswordFieldsValid = () => {
      let result =
        emailInput !== undefined &&
        passwordInput !== undefined &&
        confirmPasswordInput !== undefined;
      console.log("result is: ", result);
      return result;
    };
    const homeAddressFormValid = () => {
      let result =
        addressLine1 !== undefined &&
        addressLine2 !== undefined &&
        city !== undefined &&
        homeState !== undefined &&
        zip !== undefined;
      return result;
    };
    const createAccount = (e) => {
      console.log("in createAccount");
      setIsLoading(true);
      let newAccountData = {
        email: emailInput,
        password: passwordInput,
        confirmPassword: confirmPasswordInput,
        username: usernameInput,
      };
      handleSubmitz(e);
      const hasValidationErrors = Object.keys(errorsz).length > 0;
      if (hasValidationErrors) {
        setIsLoading(false);
        return;
      }
      auth.signup(emailInput, passwordInput);
      history.replace(from);
      history.push("/verification");
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
        createUserWithEmailAndPassword(firebaseAuth, emailInput, passwordInput)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // ...
            console.log("calling auth.signin from handleSubmit");
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
            console.log("calling auth.signin from signInWithEmailAndPassword");
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
      <Spinner />
    ) : isLoggedIn ? (
      goToDashboard()
    ) : (
      <div className="container full-height">
        <section className="login-clean">
          <form>
            <h1 style={{ color: "gray", textAlign: "center" }}>Scrubbit</h1>
            <h6 style={{ color: "gray", textAlign: "center" }}>Mobile Wash</h6>
            <div className="illustration">
              <i className="icon ion-waterdrop"></i>
            </div>
            {firebaseValidationError && (
              <p className="error">{firebaseValidationError}</p>
            )}
            {showEmailField ? (
              <div className="mb-3">
                {emailError && <p className="error">{emailError}</p>}
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={emailInput ? emailInput : undefined}
                  onChange={(e) => {
                    setEmailInput(e.target.value);
                    handleChangez("email", null, e);
                  }}
                />
              </div>
            ) : (
              <div />
            )}
            {showPasswordField ? (
              <div className="mb-3">
                {passwordError && <p className="error">{passwordError}</p>}
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={passwordInput ? passwordInput : undefined}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    handleChangez("password", null, e);
                  }}
                />
              </div>
            ) : (
              <div />
            )}
            {showConfirmPasswordField ? (
              <div>
                <div className="mb-3">
                  {confirmPasswordError && (
                    <p className="error">{confirmPasswordError}</p>
                  )}
                  <input
                    className="form-control"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={
                      confirmPasswordInput ? confirmPasswordInput : undefined
                    }
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
            {showFirstNameField ? (
              <div>
                <div className="mb-3">
                  {firstNameError && <p className="error">{firstNameError}</p>}
                  <input
                    className="form-control"
                    type="text"
                    name="firstname"
                    placeholder="First name"
                    value={firstName ? firstName : undefined}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      handleChangez("firstname", null, e);
                    }}
                  />
                </div>
              </div>
            ) : (
              <div />
            )}
            {showLastNameField ? (
              <div>
                <div className="mb-3">
                  {lastNameError && <p className="error">{lastNameError}</p>}
                  <input
                    className="form-control"
                    type="text"
                    name="lastname"
                    placeholder="Last name"
                    value={lastName ? lastName : undefined}
                    onChange={(e) => {
                      setLastName(e.target.value);
                      handleChangez("lastname", null, e);
                    }}
                  />
                </div>
              </div>
            ) : (
              <div />
            )}
            {showDOBField ? (
              <div>
                <div className="mb-3">
                  {dateOfBirthError && (
                    <p className="error">{dateOfBirthError}</p>
                  )}
                  <input
                    className="form-control"
                    type={dateType}
                    name="dateofbirth"
                    placeholder="Date of birth"
                    onFocus={() => {
                      setDateType("date");
                    }}
                    value={dateOfBirth ? dateOfBirth : undefined}
                    onChange={(e) => {
                      setDateOfBirth(e.target.value);
                      handleChangez("dateOfBirth", null, e);
                    }}
                  />
                </div>
              </div>
            ) : (
              <div />
            )}
            {showAddressLine1Field ? (
              <div>
                <div className="mb-3">
                  {errorsz.confirmPassword && (
                    <p className="error">{errorsz.confirmPassword}</p>
                  )}
                  <input
                    className="form-control"
                    type="text"
                    name="addressLine1"
                    placeholder="Address Line 1"
                    value={addressLine1 ? addressLine1 : undefined}
                    onChange={(e) => {
                      setAddressLine1(e.target.value);
                      handleChangez("addressLine1", null, e);
                    }}
                  />
                </div>
              </div>
            ) : (
              <div />
            )}
            {showAddressLine2Field ? (
              <div>
                <div className="mb-3">
                  {errorsz.confirmPassword && (
                    <p className="error">{errorsz.confirmPassword}</p>
                  )}
                  <input
                    className="form-control"
                    type="text"
                    name="addressLine2"
                    placeholder="Address Line 2"
                    value={addressLine2 ? addressLine2 : undefined}
                    onChange={(e) => {
                      setAddressLine2(e.target.value);
                      handleChangez("addressLine2", null, e);
                    }}
                  />
                </div>
              </div>
            ) : (
              <div />
            )}
            {showCityField ? (
              <div>
                <div className="mb-3">
                  {errorsz.confirmPassword && (
                    <p className="error">{errorsz.confirmPassword}</p>
                  )}
                  <input
                    className="form-control"
                    type="text"
                    name="city"
                    placeholder="City"
                    value={city ? city : undefined}
                    onChange={(e) => {
                      setCity(e.target.value);
                      handleChangez("city", null, e);
                    }}
                  />
                </div>
              </div>
            ) : (
              <div />
            )}
            {showHomeStateField ? (
              <div>
                <div className="mb-3">
                  {errorsz.confirmPassword && (
                    <p className="error">{errorsz.confirmPassword}</p>
                  )}
                  <select
                    className="form-control"
                    name="homeState"
                    placeholder="State"
                    value={homeState ? homeState : undefined}
                    onChange={(e) => {
                      setHomeState(e.target.value);
                      handleChangez("homeState", null, e);
                    }}
                  >
                    <optgroup>
                      <option value="" disabled selected>
                        State
                      </option>
                      <option>GA</option>
                    </optgroup>
                  </select>
                </div>
              </div>
            ) : (
              <div />
            )}
            {showZipField ? (
              <div>
                <div className="mb-3">
                  {errorsz.confirmPassword && (
                    <p className="error">{errorsz.confirmPassword}</p>
                  )}
                  <input
                    className="form-control"
                    type="text"
                    name="zip"
                    placeholder="zip"
                    value={zip ? zip : undefined}
                    onChange={(e) => {
                      setZip(e.target.value);
                      handleChangez("zip", null, e);
                    }}
                  />
                </div>
              </div>
            ) : (
              <div />
            )}
            {showPhoneNumberField ? (
              <div>
                <div className="mb-3">
                  {phoneNumberError && (
                    <p className="error">{phoneNumberError}</p>
                  )}
                  <input
                    className="form-control"
                    type="text"
                    name="phoneNumber"
                    placeholder="Phone number"
                    required
                    value={phoneNumber ? phoneNumber : undefined}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                      handleChangez("phoneNumber", null, e);
                    }}
                  />
                </div>
              </div>
            ) : (
              <div />
            )}
            {formIndex !== 3 ? (
              <div className="mb-3">
                <button
                  className="btn btn-primary d-block w-100"
                  type="button"
                  onClick={handleNextForm}
                >
                  Next
                </button>
              </div>
            ) : (
              <div></div>
            )}
            {formIndex === 3 ? (
              <div className="mb-3">
                <div class="termsx">
                  <h1>END USER LICENSE AGREEMENT</h1> <br />
                  <hr></hr>
                  <b>Last updated October 08, 2022</b>
                  <hr></hr>
                  Scrubbit Mobile Wash is licensed to You (End-User) by Scrubbit
                  Mobile Wash, located and registered at 1077 Roanoke Ave,
                  McDonough, Georgia 30253, United States ("Licensor"), for use
                  only under the terms of this License Agreement. By downloading
                  the Licensed Application from Apple's software distribution
                  platform ("App Store") and Google's software distribution
                  platform ("Play Store"), and any update thereto (as permitted
                  by this License Agreement), You indicate that You agree to be
                  bound by all of the terms and conditions of this License
                  Agreement, and that You accept this License Agreement. App
                  Store and Play Store are referred to in this License Agreement
                  as "Services." The parties of this License Agreement
                  acknowledge that the Services are not a Party to this License
                  Agreement and are not bound by any provisions or obligations
                  with regard to the Licensed Application, such as warranty,
                  liability, maintenance and support thereof. Scrubbit Mobile
                  Wash, not the Services, is solely responsible for the Licensed
                  Application and the content thereof. This License Agreement
                  may not provide for usage rules for the Licensed Application
                  that are in conflict with the latest Apple Media Services
                  Terms and Conditions and Google Play Terms of Service ("Usage
                  Rules"). Scrubbit Mobile Wash acknowledges that it had the
                  opportunity to review the Usage Rules and this License
                  Agreement is not conflicting with them. Scrubbit Mobile Wash
                  when purchased or downloaded through the Services, is licensed
                  to You for use only under the terms of this License Agreement.
                  The Licensor reserves all rights not expressly granted to You.
                  Scrubbit Mobile Wash is to be used on devices that operate
                  with Apple's operating systems ("iOS" and "Mac OS") or
                  Google's operating system ("Android"). <br></br>
                  <hr></hr>
                  <h3>TABLE OF CONTENTS</h3> <br />
                  <b>1. </b>THE APPLICATION <br></br>
                  <b>2. </b>SCOPE OF LICENSE 3. TECHNICAL REQUIREMENTS 4.
                  MAINTENANCE AND SUPPORT 5. USE OF DATA 6. USER-GENERATED
                  CONTRIBUTIONS 7. CONTRIBUTION LICENSE 8. LIABILITY 9. WARRANTY
                  10. PRODUCT CLAIMS 11. LEGAL COMPLIANCE 12. CONTACT
                  INFORMATION 13. TERMINATION 14. THIRD-PARTY TERMS OF
                  AGREEMENTS AND BENEFICIARY 15. INTELLECTUAL PROPERTY RIGHTS
                  16. APPLICABLE LAW 17. MISCELLANEOUS 1. THE APPLICATION
                  Scrubbit Mobile Wash ("Licensed Application") is a piece of
                  software created to E-Commerce — and customized for iOS and
                  Android mobile devices ("Devices"). It is used to Dispatch
                  local cleaner and detailers. Furthermore, it is used to
                  operate as a broker between 1099 cleaning contractors and
                  clients. . The Licensed Application is not tailored to comply
                  with industry-specific regulations (Health Insurance
                  Portability and Accountability Act (HIPAA), Federal
                  Information Security Management Act (FISMA), etc.), so if your
                  interactions would be subjected to such laws, you may not use
                  this Licensed Application. You may not use the Licensed
                  Application in a way that would violate the Gramm-Leach-Bliley
                  Act (GLBA). 2. SCOPE OF LICENSE 2.1 You are given a
                  non-transferable, non-exclusive, non-sublicensable license to
                  install and use the Licensed Application on any Devices that
                  You (End-User) own or control and as permitted by the Usage
                  Rules, with the exception that such Licensed Application may
                  be accessed and used by other accounts associated with You
                  (End-User, The Purchaser) via Family Sharing or volume
                  purchasing. 2.2 This license will also govern any updates of
                  the Licensed Application provided by Licensor that replace,
                  repair, and/or supplement the first Licensed Application,
                  unless a separate license is provided for such update, in
                  which case the terms of that new license will govern. 2.3 You
                  may not share or make the Licensed Application available to
                  third parties (unless to the degree allowed by the Usage
                  Rules, and with Scrubbit Mobile Wash's prior written consent),
                  sell, rent, lend, lease or otherwise redistribute the Licensed
                  Application. 2.4 You may not reverse engineer, translate,
                  disassemble, integrate, decompile, remove, modify, combine,
                  create derivative works or updates of, adapt, or attempt to
                  derive the source code of the Licensed Application, or any
                  part thereof (except with Scrubbit Mobile Wash's prior written
                  consent). 2.5 You may not copy (excluding when expressly
                  authorized by this license and the Usage Rules) or alter the
                  Licensed Application or portions thereof. You may create and
                  store copies only on devices that You own or control for
                  backup keeping under the terms of this license, the Usage
                  Rules, and any other terms and conditions that apply to the
                  device or software used. You may not remove any intellectual
                  property notices. You acknowledge that no unauthorized third
                  parties may gain access to these copies at any time. If you
                  sell your Devices to a third party, you must remove the
                  Licensed Application from the Devices before doing so. 2.6
                  Violations of the obligations mentioned above, as well as the
                  attempt of such infringement, may be subject to prosecution
                  and damages. 2.7 Licensor reserves the right to modify the
                  terms and conditions of licensing. 2.8 Nothing in this license
                  should be interpreted to restrict third-party terms. When
                  using the Licensed Application, You must ensure that You
                  comply with applicable third-party terms and conditions. 3.
                  TECHNICAL REQUIREMENTS 3.1 Licensor attempts to keep the
                  Licensed Application updated so that it complies with
                  modified/new versions of the firmware and new hardware. You
                  are not granted rights to claim such an update. 3.2 You
                  acknowledge that it is Your responsibility to confirm and
                  determine that the app end-user device on which You intend to
                  use the Licensed Application satisfies the technical
                  specifications mentioned above. 3.3 Licensor reserves the
                  right to modify the technical specifications as it sees
                  appropriate at any time. 4. MAINTENANCE AND SUPPORT 4.1 The
                  Licensor is solely responsible for providing any maintenance
                  and support services for this Licensed Application. You can
                  reach the Licensor at the email address listed in the App
                  Store or Play Store Overview for this Licensed Application.
                  4.2 Scrubbit Mobile Wash and the End-User acknowledge that the
                  Services have no obligation whatsoever to furnish any
                  maintenance and support services with respect to the Licensed
                  Application. 5. USE OF DATA You acknowledge that Licensor will
                  be able to access and adjust Your downloaded Licensed
                  Application content and Your personal information, and that
                  Licensor's use of such material and information is subject to
                  Your legal agreements with Licensor and Licensor's privacy
                  policy, which can be found at the bottom of the Licensed
                  Application. You acknowledge that the Licensor may
                  periodically collect and use technical data and related
                  information about your device, system, and application
                  software, and peripherals, offer product support, facilitate
                  the software updates, and for purposes of providing other
                  services to you (if any) related to the Licensed Application.
                  Licensor may also use this information to improve its products
                  or to provide services or technologies to you, as long as it
                  is in a form that does not personally identify you. 6.
                  USER-GENERATED CONTRIBUTIONS The Licensed Application may
                  invite you to chat, contribute to, or participate in blogs,
                  message boards, online forums, and other functionality, and
                  may provide you with the opportunity to create, submit, post,
                  display, transmit, perform, publish, distribute, or broadcast
                  content and materials to us or in the Licensed Application,
                  including but not limited to text, writings, video, audio,
                  photographs, graphics, comments, suggestions, or personal
                  information or other material (collectively, "Contributions").
                  Contributions may be viewable by other users of the Licensed
                  Application and through third-party websites or applications.
                  As such, any Contributions you transmit may be treated as
                  non-confidential and non-proprietary. When you create or make
                  available any Contributions, you thereby represent and warrant
                  that: 1. The creation, distribution, transmission, public
                  display, or performance, and the accessing, downloading, or
                  copying of your Contributions do not and will not infringe the
                  proprietary rights, including but not limited to the
                  copyright, patent, trademark, trade secret, or moral rights of
                  any third party. 2. You are the creator and owner of or have
                  the necessary licenses, rights, consents, releases, and
                  permissions to use and to authorize us, the Licensed
                  Application, and other users of the Licensed Application to
                  use your Contributions in any manner contemplated by the
                  Licensed Application and this License Agreement. 3. You have
                  the written consent, release, and/or permission of each and
                  every identifiable individual person in your Contributions to
                  use the name or likeness or each and every such identifiable
                  individual person to enable inclusion and use of your
                  Contributions in any manner contemplated by the Licensed
                  Application and this License Agreement. 4. Your Contributions
                  are not false, inaccurate, or misleading. 5. Your
                  Contributions are not unsolicited or unauthorized advertising,
                  promotional materials, pyramid schemes, chain letters, spam,
                  mass mailings, or other forms of solicitation. 6. Your
                  Contributions are not obscene, lewd, lascivious, filthy,
                  violent, harassing, libelous, slanderous, or otherwise
                  objectionable (as determined by us). 7. Your Contributions do
                  not ridicule, mock, disparage, intimidate, or abuse anyone. 8.
                  Your Contributions are not used to harass or threaten (in the
                  legal sense of those terms) any other person and to promote
                  violence against a specific person or class of people. 9. Your
                  Contributions do not violate any applicable law, regulation,
                  or rule. 10. Your Contributions do not violate the privacy or
                  publicity rights of any third party. 11. Your Contributions do
                  not violate any applicable law concerning child pornography,
                  or otherwise intended to protect the health or well-being of
                  minors. 12. Your Contributions do not include any offensive
                  comments that are connected to race, national origin, gender,
                  sexual preference, or physical handicap. 13. Your
                  Contributions do not otherwise violate, or link to material
                  that violates, any provision of this License Agreement, or any
                  applicable law or regulation. Any use of the Licensed
                  Application in violation of the foregoing violates this
                  License Agreement and may result in, among other things,
                  termination or suspension of your rights to use the Licensed
                  Application. 7. CONTRIBUTION LICENSE By posting your
                  Contributions to any part of the Licensed Application or
                  making Contributions accessible to the Licensed Application by
                  linking your account from the Licensed Application to any of
                  your social networking accounts, you automatically grant, and
                  you represent and warrant that you have the right to grant, to
                  us an unrestricted, unlimited, irrevocable, perpetual,
                  non-exclusive, transferable, royalty-free, fully-paid,
                  worldwide right, and license to host, use copy, reproduce,
                  disclose, sell, resell, publish, broad cast, retitle, archive,
                  store, cache, publicly display, reformat, translate, transmit,
                  excerpt (in whole or in part), and distribute such
                  Contributions (including, without limitation, your image and
                  voice) for any purpose, commercial advertising, or otherwise,
                  and to prepare derivative works of, or incorporate in other
                  works, such as Contributions, and grant and authorize
                  sublicenses of the foregoing. The use and distribution may
                  occur in any media formats and through any media channels.
                  This license will apply to any form, media, or technology now
                  known or hereafter developed, and includes our use of your
                  name, company name, and franchise name, as applicable, and any
                  of the trademarks, service marks, trade names, logos, and
                  personal and commercial images you provide. You waive all
                  moral rights in your Contributions, and you warrant that moral
                  rights have not otherwise been asserted in your Contributions.
                  We do not assert any ownership over your Contributions. You
                  retain full ownership of all of your Contributions and any
                  intellectual property rights or other proprietary rights
                  associated with your Contributions. We are not liable for any
                  statements or representations in your Contributions provided
                  by you in any area in the Licensed Application. You are solely
                  responsible for your Contributions to the Licensed Application
                  and you expressly agree to exonerate us from any and all
                  responsibility and to refrain from any legal action against us
                  regarding your Contributions. We have the right, in our sole
                  and absolute discretion, (1) to edit, redact, or otherwise
                  change any Contributions; (2) to recategorize any
                  Contributions to place them in more appropriate locations in
                  the Licensed Application; and (3) to prescreen or delete any
                  Contributions at any time and for any reason, without notice.
                  We have no obligation to monitor your Contributions. 8.
                  LIABILITY 8.1 Licensor's responsibility in the case of
                  violation of obligations and tort shall be limited to intent
                  and gross negligence. Only in case of a breach of essential
                  contractual duties (cardinal obligations), Licensor shall also
                  be liable in case of slight negligence. In any case, liability
                  shall be limited to the foreseeable, contractually typical
                  damages. The limitation mentioned above does not apply to
                  injuries to life, limb, or health. 8.2 Licensor takes no
                  accountability or responsibility for any damages caused due to
                  a breach of duties according to Section 2 of this License
                  Agreement. To avoid data loss, You are required to make use of
                  backup functions of the Licensed Application to the extent
                  allowed by applicable third-party terms and conditions of use.
                  You are aware that in case of alterations or manipulations of
                  the Licensed Application, You will not have access to the
                  Licensed Application. 8.3 Licensor takes no accountability and
                  responsibility in case of Damages to personal property when
                  accessed by cleaners.. 8.4 Licensor takes no accountability
                  and responsibility in case of Stolen or missing property
                  within the agreed space/property that is being cleaned.. 9.
                  WARRANTY 9.1 Licensor warrants that the Licensed Application
                  is free of spyware, trojan horses, viruses, or any other
                  malware at the time of Your download. Licensor warrants that
                  the Licensed Application works as described in the user
                  documentation. 9.2 No warranty is provided for the Licensed
                  Application that is not executable on the device, that has
                  been unauthorizedly modified, handled inappropriately or
                  culpably, combined or installed with inappropriate hardware or
                  software, used with inappropriate accessories, regardless if
                  by Yourself or by third parties, or if there are any other
                  reasons outside of Scrubbit Mobile Wash's sphere of influence
                  that affect the executability of the Licensed Application. 9.3
                  You are required to inspect the Licensed Application
                  immediately after installing it and notify Scrubbit Mobile
                  Wash about issues discovered without delay by email provided
                  in Product Claims. The defect report will be taken into
                  consideration and further investigated if it has been emailed
                  within a period of ninety (90) days after discovery. 9.4 If we
                  confirm that the Licensed Application is defective, Scrubbit
                  Mobile Wash reserves a choice to remedy the situation either
                  by means of solving the defect or substitute delivery. 9.5 In
                  the event of any failure of the Licensed Application to
                  conform to any applicable warranty, You may notify the
                  Services Store Operator, and Your Licensed Application
                  purchase price will be refunded to You. To the maximum extent
                  permitted by applicable law, the Services Store Operator will
                  have no other warranty obligation whatsoever with respect to
                  the Licensed Application, and any other losses, claims,
                  damages, liabilities, expenses, and costs attributable to any
                  negligence to adhere to any warranty. 9.6 If the user is an
                  entrepreneur, any claim based on faults expires after a
                  statutory period of limitation amounting to twelve (12) months
                  after the Licensed Application was made available to the user.
                  The statutory periods of limitation given by law apply for
                  users who are consumers. 10. PRODUCT CLAIMS Scrubbit Mobile
                  Wash and the End-User acknowledge that Scrubbit Mobile Wash,
                  and not the Services, is responsible for addressing any claims
                  of the End-User or any third party relating to the Licensed
                  Application or the End-User’s possession and/or use of that
                  Licensed Application, including, but not limited to: (i)
                  product liability claims; (ii) any claim that the Licensed
                  Application fails to conform to any applicable legal or
                  regulatory requirement; and (iii) claims arising under
                  consumer protection, privacy, or similar legislation,
                  including in connection with Your Licensed Application’s use
                  of the HealthKit and HomeKit. 11. LEGAL COMPLIANCE You
                  represent and warrant that You are not located in a country
                  that is subject to a US Government embargo, or that has been
                  designated by the US Government as a "terrorist supporting"
                  country; and that You are not listed on any US Government list
                  of prohibited or restricted parties. 12. CONTACT INFORMATION
                  For general inquiries, complaints, questions or claims
                  concerning the Licensed Application, please contact: Freddy
                  Acevedo 1077 Roanoke Ave McDonough, GA 30253 United States
                  freddyace1993@gmail.com 13. TERMINATION The license is valid
                  until terminated by Scrubbit Mobile Wash or by You. Your
                  rights under this license will terminate automatically and
                  without notice from Scrubbit Mobile Wash if You fail to adhere
                  to any term(s) of this license. Upon License termination, You
                  shall stop all use of the Licensed Application, and destroy
                  all copies, full or partial, of the Licensed Application. 14.
                  THIRD-PARTY TERMS OF AGREEMENTS AND BENEFICIARY Scrubbit
                  Mobile Wash represents and warrants that Scrubbit Mobile Wash
                  will comply with applicable third-party terms of agreement
                  when using Licensed Application. In Accordance with Section 9
                  of the "Instructions for Minimum Terms of Developer's End-User
                  License Agreement," both Apple and Google and their
                  subsidiaries shall be third-party beneficiaries of this End
                  User License Agreement and — upon Your acceptance of the terms
                  and conditions of this License Agreement, both Apple and
                  Google will have the right (and will be deemed to have
                  accepted the right) to enforce this End User License Agreement
                  against You as a third-party beneficiary thereof. 15.
                  INTELLECTUAL PROPERTY RIGHTS Scrubbit Mobile Wash and the
                  End-User acknowledge that, in the event of any third-party
                  claim that the Licensed Application or the End-User's
                  possession and use of that Licensed Application infringes on
                  the third party's intellectual property rights, Scrubbit
                  Mobile Wash, and not the Services, will be solely responsible
                  for the investigation, defense, settlement, and discharge or
                  any such intellectual property infringement claims. 16.
                  APPLICABLE LAW This License Agreement is governed by the laws
                  of the State of Georgia excluding its conflicts of law rules.
                  17. MISCELLANEOUS 17.1 If any of the terms of this agreement
                  should be or become invalid, the validity of the remaining
                  provisions shall not be affected. Invalid terms will be
                  replaced by valid ones formulated in a way that will achieve
                  the primary purpose. 17.2 Collateral agreements, changes and
                  amendments are only valid if laid down in writing. The
                  preceding clause can only be waived in writing. This EULA was
                  created using Termly's EULA Generator.
                </div>
                <br></br>
                <label class="container-checkbox">
                  I Agree
                  <input
                    id="agreement"
                    type="checkbox"
                    onChange={(e) => {
                      console.log("value of checkbox is: ", e.target.checked);
                    }}
                  />
                  <span class="checkmark"></span>
                </label>
                <button
                  className="btn btn-primary d-block w-100"
                  type="button"
                  onClick={createAccount}
                >
                  Register
                </button>
              </div>
            ) : (
              <div></div>
            )}
            {formIndex !== 0 ? (
              <div className="mb-3">
                <button
                  className="btn btn-primary d-block w-100"
                  type="button"
                  onClick={handlePrevious}
                >
                  Previous
                </button>
              </div>
            ) : (
              <div></div>
            )}
            <a
              className="forgot"
              onClick={() => {
                handleCancelClicked();
              }}
            >
              Cancel
            </a>
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
      </div>
    );
  };

  return <Landing />;
};
export default CreateAccount;

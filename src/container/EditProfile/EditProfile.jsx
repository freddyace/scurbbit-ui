import profilePic from "../Dashboard/img/img.png";
import "./assets/bootstrap/css/bootstrap.min.css";
import "./assets/css/Navigation-Menu.css";
import "./assets/css/Pricing-Table---EspacioBinariocom.css";
import "./assets/css/Profile-Edit-Form.css";
import "./assets/css/styles.css";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useState, useEffect } from "react";
import { validateEditAccount } from "../../helpers/validation/useForm";
import { updateProfile } from "firebase/auth";
import { getDatabase, set } from "firebase/database";

const EditProfile = (props) => {
  const [file, setfile] = useState();
  const userEmail = props?.auth?.currentUser?.email;
  const filePathRef = ref(props.storage, userEmail + "/profilePic");
  const [profilePicture, setProfilePicture] = useState(
    props?.auth?.currentUser?.photoURL
  );

  function writeUserData(userId, name, email, imageUrl) {
    const db = getDatabase();
    set(ref(db, "users/" + userId), {
      username: name,
      email: email,
      profile_picture: imageUrl,
    });
  }
  useEffect(() => {
    console.log("Attempting to fetch profile pic...");
  });
  const downloadFirebaseImg = () => {
    getDownloadURL(ref(props.storage, filePathRef))
      .then((url) => {
        // `url` is the download URL for 'images/stars.jpg'
        console.log("image url is: ", url);
        setProfilePicture(url);
        // profilePic = url
        updateProfile(props?.auth?.currentUser, {
          photoURL: url,
        })
          .then(() => {
            // Profile updated!
            // ...
            console.log("profile updated");
          })
          .catch((error) => {
            // An error occurred
            // ...
            console.log("An error occurred when trying to upload the picture.");
          });
        // This can be downloaded directly:

        // TODO: Don't need this yet...will need to cache this for PROD - Freddy
        // const xhr = new XMLHttpRequest();
        // xhr.responseType = 'blob';
        // xhr.onload = (event) => {
        //   const blob = xhr.response;
        // };
        // xhr.open('GET', url);
        // xhr.send();

        // // Or inserted into an <img> element
        // const img = document.getElementById('myimg');
        // img.setAttribute('src', url);
      })
      .catch((error) => {
        // Handle any errors
      });
  };

  const changeHandler = (event) => {
    setfile(event.target.files[0]);
  };
  useEffect(() => {
    console.log("firebase Auth: ", props.auth);
    console.log("user's email is: ", userEmail);
  });
  const onSubmit = () => {
    console.log("uploading file");
    try {
      uploadBytes(filePathRef, file).then((snapshot) => {
        console.log("uploaded a blob or file..");
        downloadFirebaseImg();
      });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <div className="container profile profile-view" id="profile">
        <div className="row">
          <div className="col-md-12 alert-col relative">
            <div
              className="alert alert-info alert-dismissible absolue center"
              role="alert"
            >
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
              <span>Profile save with success</span>
            </div>
          </div>
        </div>
        <div className="row profile-row">
          <div className="center">
            <img
              style={{
                borderRadius: "50%",
                border: "1px black solid",
                // display: "block",
                height: "100px",
                width: "100px",
              }}
              src={profilePicture}
            />
          </div>
          <input
            className="form-control form-control"
            type="file"
            name="file"
            onChange={changeHandler}
          />
          <div className="col-md-8">
            <h1>Profile </h1>
            <hr />
            <div className="row">
              <div className="col-sm-12 col-md-6">
                <div className="form-group mb-3">
                  <label className="form-label">Firstname </label>
                  <input
                    className="form-control"
                    type="text"
                    name="firstname"
                    disabled
                  />
                </div>
              </div>
              <div className="col-sm-12 col-md-6">
                <div className="form-group mb-3">
                  <label className="form-label">Lastname </label>
                  <input
                    className="form-control"
                    type="text"
                    name="lastname"
                    disabled
                  />
                </div>
              </div>
            </div>
            <div className="form-group mb-3">
              <label className="form-label">Email </label>
              <input
                className="form-control"
                type="email"
                autoComplete="off"
                required=""
                name="email"
              />
            </div>
            <div className="row">
              <div className="col-sm-12 col-md-6">
                <div className="form-group mb-3">
                  <label className="form-label">Password </label>
                  <input
                    className="form-control"
                    type="password"
                    name="password"
                    autoComplete="off"
                    required=""
                  />
                </div>
              </div>
              <div className="col-sm-12 col-md-6">
                <div className="form-group mb-3">
                  <label className="form-label">Confirm Password</label>
                  <input
                    className="form-control"
                    type="password"
                    name="confirmpass"
                    autoComplete="off"
                    required=""
                  />
                </div>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-md-12 content-right">
                <button className="btn btn-primary form-btn" onClick={onSubmit}>
                  SAVE{" "}
                </button>
                <button className="btn btn-danger form-btn" type="reset">
                  CANCEL{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <script src="assets/bootstrap/js/bootstrap.min.js"></script>
      <script src="assets/js/Profile-Edit-Form.js"></script>
    </div>
  );
};

export default EditProfile;

import profilePic from "../Dashboard/img/img.png";
import "./assets/bootstrap/css/bootstrap.min.css";
import "./assets/css/Navigation-Menu.css";
import "./assets/css/Pricing-Table---EspacioBinariocom.css";
import "./assets/css/Profile-Edit-Form.css";
import "./assets/css/styles.css";

const EditProfile = () => {
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
        <form>
          <div className="row profile-row">
            <div className="col-md-4 relative">
              <div className="avatar">
                <div
                  className="avatar-bg center"
                  style={{
                    background:
                      `url(${ profilePic ? profilePic : "url(https://www.gravatar.com/avatar/1234566?size=200&d=mm)"})`,
                  }}
                ></div>
              </div>
              <input
                className="form-control form-control"
                type="file"
                name="avatar-file"
              />
            </div>
            <div className="col-md-8">
              <h1>Profile </h1>
              <hr />
              <div className="row">
                <div className="col-sm-12 col-md-6">
                  <div className="form-group mb-3">
                    <label className="form-label">Firstname </label>
                    <input className="form-control" type="text" name="firstname" />
                  </div>
                </div>
                <div className="col-sm-12 col-md-6">
                  <div className="form-group mb-3">
                    <label className="form-label">Lastname </label>
                    <input className="form-control" type="text" name="lastname" />
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
                  <button className="btn btn-primary form-btn" type="submit">
                    SAVE{" "}
                  </button>
                  <button className="btn btn-danger form-btn" type="reset">
                    CANCEL{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <script src="assets/bootstrap/js/bootstrap.min.js"></script>
      <script src="assets/js/Profile-Edit-Form.js"></script>
    </div>
  );
};

export default EditProfile;

import profilePic from "../Dashboard/img/img.png";
import "./assets/bootstrap/css/bootstrap.min.css";
import "./assets/css/Navigation-Menu.css";
import "./assets/css/Pricing-Table---EspacioBinariocom.css";
import "./assets/css/Profile-Edit-Form-1.css";
import "./assets/css/Profile-Edit-Form.css";
import "./assets/css/styles.css";

const EditProfile = () => {
  return (
    <div>
      <nav
        class="navbar navbar-light navbar-expand-md"
        style={{ background: "linear-gradient(120deg, #00e4d0, #5983e8)" }}
      >
        <div class="container-fluid">
          <div>
            <a class="navbar-brand d-none" href="#">
              {" "}
            </a>
          </div>
          <img
            style={{
                borderRadius: "50%",
                border: "1px black solid",
                display: "block",
                height: "50px",
                width: "50px",
              }}
            src={profilePic}
          />
          <h1 style={{ color: "white" }}>Scrubbit</h1>
          <button
            data-bs-toggle="collapse"
            class="navbar-toggler"
            data-bs-target="#navcol-1"
          >
            <span class="visually-hidden">Toggle navigation</span>
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navcol-1">
            <ul class="navbar-nav main-nav">
              <li class="nav-item">
                <a
                  class="nav-link"
                  id="home"
                  style={{ color: "white" }}
                  href="#"
                >
                  Home{" "}
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" style={{ color: "white" }}>
                  About{" "}
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" style={{ color: "white" }}>
                  Contact{" "}
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" style={{ color: "white" }}>
                  Sitemap{" "}
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" style={{ color: "white" }}>
                  Declaimer{" "}
                </a>
              </li>
            </ul>
            <a href="#">Link</a>
          </div>
        </div>
      </nav>
      <div class="container profile profile-view" id="profile">
        <div class="row">
          <div class="col-md-12 alert-col relative">
            <div
              class="alert alert-info alert-dismissible absolue center"
              role="alert"
            >
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
              <span>Profile save with success</span>
            </div>
          </div>
        </div>
        <form>
          <div class="row profile-row">
            <div class="col-md-4 relative">
              <div class="avatar">
                <div class="avatar-bg center"></div>
              </div>
              <input
                class="form-control form-control"
                type="file"
                name="avatar-file"
              />
            </div>
            <div class="col-md-8">
              <h1>Profile </h1>
              <hr />
              <div class="row">
                <div class="col-sm-12 col-md-6">
                  <div class="form-group mb-3">
                    <label class="form-label">Firstname </label>
                    <input class="form-control" type="text" name="firstname" />
                  </div>
                </div>
                <div class="col-sm-12 col-md-6">
                  <div class="form-group mb-3">
                    <label class="form-label">Lastname </label>
                    <input class="form-control" type="text" name="lastname" />
                  </div>
                </div>
              </div>
              <div class="form-group mb-3">
                <label class="form-label">Email </label>
                <input
                  class="form-control"
                  type="email"
                  autoComplete="off"
                  required=""
                  name="email"
                />
              </div>
              <div class="row">
                <div class="col-sm-12 col-md-6">
                  <div class="form-group mb-3">
                    <label class="form-label">Password </label>
                    <input
                      class="form-control"
                      type="password"
                      name="password"
                      autoComplete="off"
                      required=""
                    />
                  </div>
                </div>
                <div class="col-sm-12 col-md-6">
                  <div class="form-group mb-3">
                    <label class="form-label">Confirm Password</label>
                    <input
                      class="form-control"
                      type="password"
                      name="confirmpass"
                      autoComplete="off"
                      required=""
                    />
                  </div>
                </div>
              </div>
              <hr />
              <div class="row">
                <div class="col-md-12 content-right">
                  <button class="btn btn-primary form-btn" type="submit">
                    SAVE{" "}
                  </button>
                  <button class="btn btn-danger form-btn" type="reset">
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

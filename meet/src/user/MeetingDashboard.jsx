import React, {useState, useEffect}from 'react';

const MeetingDashboard = () => {
    const [user, setUser] = useState(null);

      useEffect(() => {
    const storedUser = localStorage.getItem('googleUser');
    console.log(storedUser)
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      
    }
  }, []);
  const copyToClipboard = () => {
    const text = document.getElementById("myInput").value;
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard: " + text);
  };

  return (
    <>
     <nav className="navbar navbar-white bg-white shadow-sm">
  <div className="container-fluid d-flex justify-content-between align-items-center px-4">
    <h2 className="ms-2">MeetUpz</h2>

    {user && (
      <div className="dropdown">
        <button
          className="btn d-flex align-items-center gap-2 border-0 bg-white"
          type="button"
          id="userMenu"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src={user.picture}
            alt={user.name}
            width="40"
            height="40"
            className="rounded-circle border"
          />
          <span className="fw-bold">{user.name}</span>
        </button>
        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userMenu">
          <li><a className="dropdown-item" href="#">Profile</a></li>
          <li><a className="dropdown-item" href="#">Settings</a></li>
          <li><hr className="dropdown-divider" /></li>
          <li><a className="dropdown-item text-danger" href="#" onClick={() => {
            localStorage.removeItem('googleUser');
            window.location.reload();
          }}>Logout</a></li>
        </ul>
      </div>
    )}
  </div>
</nav>


      <div className="container-fluid mt-4" style={{ height: '80vh' }}>
        <div className="row">
          <div className="col border-end d-flex align-items-center" style={{ height: '80vh' }}>
            <div className="row w-100">
              <div className="col-sm-6 mt-3 w-100">
                <h1 className="text-center mb-4">Video calls and meetings for everyone</h1>
                <div className="text-center mb-5">
                  Connect, collaborate, and celebrate from anywhere with
                </div>

                <div className="d-flex justify-content-center pb-5 border-bottom border-dark">
                  <div className="dropdown w-25">
                    <button
                      className="btn btn-secondary dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                    >
                      New Meeting
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <a className="dropdown-item" href="#">
                          Create a meeting for later
                        </a>
                      </li>
                      <li>
                        <button
                          type="button"
                          className="dropdown-item"
                          data-bs-toggle="modal"
                          data-bs-target="#linkModal"
                        >
                          Launch demo modal
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          className="dropdown-item"
                          data-bs-toggle="modal"
                          data-bs-target="#scheduleModal"
                        >
                          Schedule your meeting
                        </button>
                      </li>
                    </ul>
                  </div>

                  <div className="d-flex w-50 align-items-center justify-content-between gap-2">
                    <input
                      className="w-100 rounded border-0 border-bottom bg-light h-100"
                      style={{ outline: 'none' }}
                      type="text"
                    />
                    <a href="#" className="text-decoration-none">
                      Join
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scheduled meetings */}
          <div className="col">
            <div className="row">
              <h3>Scheduled Meeting</h3>
              <div className="col mt-3" style={{ height: '500px' }}>
                <div className="overflow-auto h-100">
                  {Array(5).fill().map((_, index) => (
                    <div className="card bg-light mb-3" key={index}>
                      <div className="card-body">
                        <h1 className="text-center">
                          <i className="bi bi-calendar-plus"></i>
                        </h1>
                        <h5 className="card-title text-center">Scheduled</h5>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal 1: Meeting Link */}
      <div
        className="modal fade"
        id="linkModal"
        tabIndex="-1"
        aria-labelledby="linkModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="linkModalLabel">
                Here's your joining info
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                Send this to people you want to meet with. Be sure to save it so you can use it later, too.
              </div>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="myInput"
                  value="working"
                  readOnly
                />
                <span
                  className="input-group-text"
                  onClick={copyToClipboard}
                  style={{ cursor: 'pointer' }}
                >
                  <i className="bi bi-clipboard"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal 2: Schedule Form */}
      <div
        className="modal fade"
        id="scheduleModal"
        tabIndex="-1"
        aria-labelledby="scheduleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="scheduleModalLabel">
                Schedule Meeting Info
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <form className="row g-3">
                <div className="col-md-4">
                  <label className="form-label">First name</label>
                  <input type="text" className="form-control" defaultValue="Mark" required />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Last name</label>
                  <input type="text" className="form-control" defaultValue="Otto" required />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Username</label>
                  <div className="input-group">
                    <span className="input-group-text">@</span>
                    <input type="text" className="form-control" required />
                  </div>
                </div>
                <div className="col-md-6">
                  <label className="form-label">City</label>
                  <input type="text" className="form-control" required />
                </div>
                <div className="col-md-3">
                  <label className="form-label">State</label>
                  <select className="form-select" required>
                    <option value="">Choose...</option>
                    <option>...</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <label className="form-label">Zip</label>
                  <input type="text" className="form-control" required />
                </div>
                <div className="col-12">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" required />
                    <label className="form-check-label">
                      Agree to terms and conditions
                    </label>
                  </div>
                </div>
                <div className="col-12">
                  <button className="btn btn-primary" type="submit">
                    Submit form
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MeetingDashboard;

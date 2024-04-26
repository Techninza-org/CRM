import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const Tasks = () => {
  return (
    <>
      <div id="mytask-layout">
        <Sidebar />
        {/* main body area */}
        <div className="main px-lg-4 px-md-4">
          {/* Body: Header */}
          <Header />
          <>
            {/* Body: Body */}
            <div className="body d-flex py-lg-3 py-md-2">
              <div className="container-xxl">
                <div className="row align-items-center">
                  <div className="border-0 mb-4">
                    <div className="card-header py-3 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
                      <h3 className="fw-bold mb-0">Task Management</h3>
                      <div className="col-auto d-flex w-sm-100">
                        <button
                          type="button"
                          className="btn btn-dark btn-set-task w-sm-100"
                          data-bs-toggle="modal"
                          data-bs-target="#createtask"
                        >
                          <i className="icofont-plus-circle me-2 fs-6" />
                          Create Task
                        </button>
                      </div>
                    </div>
                  </div>
                </div>{" "}
                {/* Row end  */}
                <div className="row clearfix  g-3">
                  <div className="col-lg-12 col-md-12 flex-column">
                    {/* <div className="row g-3 row-deck">
            <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6">
              <div className="card">
                <div className="card-header py-3">
                  <h6 className="mb-0 fw-bold ">Task Progress</h6>
                </div>
                <div className="card-body mem-list">
                  <div className="progress-count mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <h6 className="mb-0 fw-bold d-flex align-items-center">
                        UI/UX Design
                      </h6>
                      <span className="small text-muted">02/07</span>
                    </div>
                    <div className="progress" style={{ height: 10 }}>
                      <div
                        className="progress-bar light-info-bg"
                        role="progressbar"
                        style={{ width: "92%" }}
                        aria-valuenow={92}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                  </div>
                  <div className="progress-count mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <h6 className="mb-0 fw-bold d-flex align-items-center">
                        Website Design
                      </h6>
                      <span className="small text-muted">01/03</span>
                    </div>
                    <div className="progress" style={{ height: 10 }}>
                      <div
                        className="progress-bar bg-lightgreen"
                        role="progressbar"
                        style={{ width: "60%" }}
                        aria-valuenow={60}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                  </div>
                  <div className="progress-count mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <h6 className="mb-0 fw-bold d-flex align-items-center">
                        Quality Assurance
                      </h6>
                      <span className="small text-muted">02/07</span>
                    </div>
                    <div className="progress" style={{ height: 10 }}>
                      <div
                        className="progress-bar light-success-bg"
                        role="progressbar"
                        style={{ width: "40%" }}
                        aria-valuenow={40}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                  </div>
                  <div className="progress-count mb-3">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <h6 className="mb-0 fw-bold d-flex align-items-center">
                        Development
                      </h6>
                      <span className="small text-muted">01/05</span>
                    </div>
                    <div className="progress" style={{ height: 10 }}>
                      <div
                        className="progress-bar light-orange-bg"
                        role="progressbar"
                        style={{ width: "40%" }}
                        aria-valuenow={40}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                  </div>
                  <div className="progress-count mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <h6 className="mb-0 fw-bold d-flex align-items-center">
                        Testing
                      </h6>
                      <span className="small text-muted">01/08</span>
                    </div>
                    <div className="progress" style={{ height: 10 }}>
                      <div
                        className="progress-bar bg-lightyellow"
                        role="progressbar"
                        style={{ width: "30%" }}
                        aria-valuenow={30}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6">
              <div className="card">
                <div className="card-header py-3">
                  <h6 className="mb-0 fw-bold ">Recent Activity</h6>
                </div>
                <div className="card-body mem-list">
                  <div className="timeline-item ti-danger border-bottom ms-2">
                    <div className="d-flex">
                      <span className="avatar d-flex justify-content-center align-items-center rounded-circle light-success-bg">
                        RH
                      </span>
                      <div className="flex-fill ms-3">
                        <div className="mb-1">
                          <strong>Rechard Add New Task</strong>
                        </div>
                        <span className="d-flex text-muted">20Min ago</span>
                      </div>
                    </div>
                  </div>{" "}
                  <div className="timeline-item ti-info border-bottom ms-2">
                    <div className="d-flex">
                      <span className="avatar d-flex justify-content-center align-items-center rounded-circle bg-careys-pink">
                        SP
                      </span>
                      <div className="flex-fill ms-3">
                        <div className="mb-1">
                          <strong>Shipa Review Completed</strong>
                        </div>
                        <span className="d-flex text-muted">40Min ago</span>
                      </div>
                    </div>
                  </div>{" "}
                  <div className="timeline-item ti-info border-bottom ms-2">
                    <div className="d-flex">
                      <span className="avatar d-flex justify-content-center align-items-center rounded-circle bg-careys-pink">
                        MR
                      </span>
                      <div className="flex-fill ms-3">
                        <div className="mb-1">
                          <strong>Mora Task To Completed</strong>
                        </div>
                        <span className="d-flex text-muted">1Hr ago</span>
                      </div>
                    </div>
                  </div>
                  <div className="timeline-item ti-success  ms-2">
                    <div className="d-flex">
                      <span className="avatar d-flex justify-content-center align-items-center rounded-circle bg-lavender-purple">
                        FL
                      </span>
                      <div className="flex-fill ms-3">
                        <div className="mb-1">
                          <strong>Fila Add New Task</strong>
                        </div>
                        <span className="d-flex text-muted">1Day ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>{" "}
            </div>
            <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-12">
              <div className="card">
                <div className="card-header py-3">
                  <h6 className="mb-0 fw-bold ">Allocated Task Members</h6>
                </div>
                <div className="card-body">
                  <div className="flex-grow-1 mem-list">
                    <div className="py-2 d-flex align-items-center border-bottom">
                      <div className="d-flex ms-2 align-items-center flex-fill">
                        <img
                          src="assets/images/xs/avatar6.jpg"
                          className="avatar lg rounded-circle img-thumbnail"
                          alt="avatar"
                        />
                        <div className="d-flex flex-column ps-2">
                          <h6 className="fw-bold mb-0">Lucinda Massey</h6>
                          <span className="small text-muted">
                            Ui/UX Designer
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="btn light-danger-bg text-end"
                        data-bs-toggle="modal"
                        data-bs-target="#dremovetask"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="py-2 d-flex align-items-center border-bottom">
                      <div className="d-flex ms-2 align-items-center flex-fill">
                        <img
                          src="assets/images/xs/avatar4.jpg"
                          className="avatar lg rounded-circle img-thumbnail"
                          alt="avatar"
                        />
                        <div className="d-flex flex-column ps-2">
                          <h6 className="fw-bold mb-0">Ryan Nolan</h6>
                          <span className="small text-muted">
                            Website Designer
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="btn light-danger-bg text-end"
                        data-bs-toggle="modal"
                        data-bs-target="#dremovetask"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="py-2 d-flex align-items-center border-bottom">
                      <div className="d-flex ms-2 align-items-center flex-fill">
                        <img
                          src="assets/images/xs/avatar9.jpg"
                          className="avatar lg rounded-circle img-thumbnail"
                          alt="avatar"
                        />
                        <div className="d-flex flex-column ps-2">
                          <h6 className="fw-bold mb-0">Oliver Black</h6>
                          <span className="small text-muted">
                            App Developer
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="btn light-danger-bg text-end"
                        data-bs-toggle="modal"
                        data-bs-target="#dremovetask"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="py-2 d-flex align-items-center border-bottom">
                      <div className="d-flex ms-2 align-items-center flex-fill">
                        <img
                          src="assets/images/xs/avatar10.jpg"
                          className="avatar lg rounded-circle img-thumbnail"
                          alt="avatar"
                        />
                        <div className="d-flex flex-column ps-2">
                          <h6 className="fw-bold mb-0">Adam Walker</h6>
                          <span className="small text-muted">
                            Quality Checker
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="btn light-danger-bg text-end"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="py-2 d-flex align-items-center border-bottom">
                      <div className="d-flex ms-2 align-items-center flex-fill">
                        <img
                          src="assets/images/xs/avatar4.jpg"
                          className="avatar lg rounded-circle img-thumbnail"
                          alt="avatar"
                        />
                        <div className="d-flex flex-column ps-2">
                          <h6 className="fw-bold mb-0">Brian Skinner</h6>
                          <span className="small text-muted">
                            Quality Checker
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="btn light-danger-bg text-end"
                        data-bs-toggle="modal"
                        data-bs-target="#dremovetask"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="py-2 d-flex align-items-center border-bottom">
                      <div className="d-flex ms-2 align-items-center flex-fill">
                        <img
                          src="assets/images/xs/avatar11.jpg"
                          className="avatar lg rounded-circle img-thumbnail"
                          alt="avatar"
                        />
                        <div className="d-flex flex-column ps-2">
                          <h6 className="fw-bold mb-0">Dan Short</h6>
                          <span className="small text-muted">
                            App Developer
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="btn light-danger-bg text-end"
                        data-bs-toggle="modal"
                        data-bs-target="#dremovetask"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="py-2 d-flex align-items-center border-bottom">
                      <div className="d-flex ms-2 align-items-center flex-fill">
                        <img
                          src="assets/images/xs/avatar3.jpg"
                          className="avatar lg rounded-circle img-thumbnail"
                          alt="avatar"
                        />
                        <div className="d-flex flex-column ps-2">
                          <h6 className="fw-bold mb-0">Jack Glover</h6>
                          <span className="small text-muted">
                            Ui/UX Designer
                          </span>
                        </div>
                      </div>
                      
                    </div>
                  </div>
                </div>
              </div>{" "}
            </div>
          </div> */}
                    <div className="row taskboard g-3 py-xxl-4">
                      <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-12 mt-xxl-4 mt-xl-4 mt-lg-4 mt-md-4 mt-sm-4 mt-4">
                        {/* <h6 className="fw-bold py-3 mb-0">In Progress</h6> */}
                        <div className="">
                          <div className="dd" data-plugin="nestable">
                            <ol className="dd-list">
                              <li className="dd-item" data-id={1}>
                                <div className="dd-handle">
                                  <div className="task-info d-flex align-items-center justify-content-between">
                                    <h6 className="light-success-bg py-1 px-2 rounded-1 d-inline-block fw-bold small-14 mb-0">
                                      Quality Assurance
                                    </h6>
                                    <div className="task-priority d-flex flex-column align-items-center justify-content-center">
                                      <div className="avatar-list avatar-list-stacked m-0">
                                        <img
                                          className="avatar rounded-circle small-avt"
                                          src="assets/images/xs/avatar2.jpg"
                                          alt=""
                                        />
                                        <img
                                          className="avatar rounded-circle small-avt"
                                          src="assets/images/xs/avatar1.jpg"
                                          alt=""
                                        />
                                      </div>
                                      <span className="badge bg-warning text-end mt-2">
                                        MEDIUM
                                      </span>
                                    </div>
                                  </div>
                                  <p className="py-2 mb-0">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. In id nec scelerisque
                                    massa.
                                  </p>
                                  <div className="tikit-info row g-3 align-items-center">
                                    <div className="col-sm">
                                      <ul className="d-flex list-unstyled align-items-center flex-wrap">
                                        <li className="me-2">
                                          <div className="d-flex align-items-center">
                                            <i className="icofont-flag" />
                                            <span className="ms-1">28 Mar</span>
                                          </div>
                                        </li>
                                        <li className="me-2">
                                          <div className="d-flex align-items-center">
                                            <i className="icofont-ui-text-chat" />
                                            <span className="ms-1">5</span>
                                          </div>
                                        </li>
                                        <li>
                                          <div className="d-flex align-items-center">
                                            <i className="icofont-paper-clip" />
                                            <span className="ms-1">5</span>
                                          </div>
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="d-flex justify-content-center align-items-center">
                                      <button
                                        type="button"
                                        className="btn light-danger-bg text-end small text-truncate light-danger-bg py-1 px-2 rounded-1 d-inline-block fw-bold small"
                                        data-bs-toggle="modal"
                                        data-bs-target="#dremovetask"
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            </ol>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <>
              {/* Modal Members*/}
              <div
                className="modal fade"
                id="addUser"
                tabIndex={-1}
                aria-labelledby="addUserLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered modal-lg">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title  fw-bold" id="addUserLabel">
                        Employee Invitation
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      />
                    </div>
                    <div className="modal-body">
                      <div className="inviteby_email">
                        <div className="input-group mb-3">
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Email address"
                            id="exampleInputEmail1"
                            aria-describedby="exampleInputEmail1"
                          />
                          <button
                            className="btn btn-dark"
                            type="button"
                            id="button-addon2"
                          >
                            Sent
                          </button>
                        </div>
                      </div>
                      <div className="members_list">
                        <h6 className="fw-bold ">Employee </h6>
                        <ul className="list-unstyled list-group list-group-custom list-group-flush mb-0">
                          <li className="list-group-item py-3 text-center text-md-start">
                            <div className="d-flex align-items-center flex-column flex-sm-column flex-md-column flex-lg-row">
                              <div className="no-thumbnail mb-2 mb-md-0">
                                <img
                                  className="avatar lg rounded-circle"
                                  src="assets/images/xs/avatar2.jpg"
                                  alt=""
                                />
                              </div>
                              <div className="flex-fill ms-3 text-truncate">
                                <h6 className="mb-0  fw-bold">
                                  Rachel Carr(you)
                                </h6>
                                <span className="text-muted">
                                  rachel.carr@gmail.com
                                </span>
                              </div>
                              <div className="members-action">
                                <span className="members-role ">Admin</span>
                                <div className="btn-group">
                                  <button
                                    type="button"
                                    className="btn bg-transparent dropdown-toggle"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    <i className="icofont-ui-settings  fs-6" />
                                  </button>
                                  <ul className="dropdown-menu dropdown-menu-end">
                                    <li>
                                      <a className="dropdown-item" href="#">
                                        <i className="icofont-ui-password fs-6 me-2" />
                                        ResetPassword
                                      </a>
                                    </li>
                                    <li>
                                      <a className="dropdown-item" href="#">
                                        <i className="icofont-chart-line fs-6 me-2" />
                                        ActivityReport
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li className="list-group-item py-3 text-center text-md-start">
                            <div className="d-flex align-items-center flex-column flex-sm-column flex-md-column flex-lg-row">
                              <div className="no-thumbnail mb-2 mb-md-0">
                                <img
                                  className="avatar lg rounded-circle"
                                  src="assets/images/xs/avatar3.jpg"
                                  alt=""
                                />
                              </div>
                              <div className="flex-fill ms-3 text-truncate">
                                <h6 className="mb-0  fw-bold">
                                  Lucas Baker
                                  <a href="#" className="link-secondary ms-2">
                                    (Resend invitation)
                                  </a>
                                </h6>
                                <span className="text-muted">
                                  lucas.baker@gmail.com
                                </span>
                              </div>
                              <div className="members-action">
                                <div className="btn-group">
                                  <button
                                    type="button"
                                    className="btn bg-transparent dropdown-toggle"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    Members
                                  </button>
                                  <ul className="dropdown-menu dropdown-menu-end">
                                    <li>
                                      <a className="dropdown-item" href="#">
                                        <i className="icofont-check-circled" />
                                        <span>All operations permission</span>
                                      </a>
                                    </li>
                                    <li>
                                      <a className="dropdown-item" href="#">
                                        <i className="fs-6 p-2 me-1" />
                                        <span>
                                          Only Invite &amp; manage team
                                        </span>
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                                <div className="btn-group">
                                  <button
                                    type="button"
                                    className="btn bg-transparent dropdown-toggle"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    <i className="icofont-ui-settings  fs-6" />
                                  </button>
                                  <ul className="dropdown-menu dropdown-menu-end">
                                    <li>
                                      <a className="dropdown-item" href="#">
                                        <i className="icofont-delete-alt fs-6 me-2" />
                                        Delete Member
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li className="list-group-item py-3 text-center text-md-start">
                            <div className="d-flex align-items-center flex-column flex-sm-column flex-md-column flex-lg-row">
                              <div className="no-thumbnail mb-2 mb-md-0">
                                <img
                                  className="avatar lg rounded-circle"
                                  src="assets/images/xs/avatar8.jpg"
                                  alt=""
                                />
                              </div>
                              <div className="flex-fill ms-3 text-truncate">
                                <h6 className="mb-0  fw-bold">Una Coleman</h6>
                                <span className="text-muted">
                                  una.coleman@gmail.com
                                </span>
                              </div>
                              <div className="members-action">
                                <div className="btn-group">
                                  <button
                                    type="button"
                                    className="btn bg-transparent dropdown-toggle"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    Members
                                  </button>
                                  <ul className="dropdown-menu dropdown-menu-end">
                                    <li>
                                      <a className="dropdown-item" href="#">
                                        <i className="icofont-check-circled" />
                                        <span>All operations permission</span>
                                      </a>
                                    </li>
                                    <li>
                                      <a className="dropdown-item" href="#">
                                        <i className="fs-6 p-2 me-1" />
                                        <span>
                                          Only Invite &amp; manage team
                                        </span>
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                                <div className="btn-group">
                                  <div className="btn-group">
                                    <button
                                      type="button"
                                      className="btn bg-transparent dropdown-toggle"
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false"
                                    >
                                      <i className="icofont-ui-settings  fs-6" />
                                    </button>
                                    <ul className="dropdown-menu dropdown-menu-end">
                                      <li>
                                        <a className="dropdown-item" href="#">
                                          <i className="icofont-ui-password fs-6 me-2" />
                                          ResetPassword
                                        </a>
                                      </li>
                                      <li>
                                        <a className="dropdown-item" href="#">
                                          <i className="icofont-chart-line fs-6 me-2" />
                                          ActivityReport
                                        </a>
                                      </li>
                                      <li>
                                        <a className="dropdown-item" href="#">
                                          <i className="icofont-delete-alt fs-6 me-2" />
                                          Suspend member
                                        </a>
                                      </li>
                                      <li>
                                        <a className="dropdown-item" href="#">
                                          <i className="icofont-not-allowed fs-6 me-2" />
                                          Delete Member
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Create task*/}
              <div
                className="modal fade"
                id="createtask"
                tabIndex={-1}
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered modal-md modal-dialog-scrollable">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5
                        className="modal-title  fw-bold"
                        id="createprojectlLabel"
                      >
                        {" "}
                        Create Task
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      />
                    </div>
                    <div className="modal-body">
                      <div className="mb-3">
                        <label className="form-label">Project Name</label>
                        <select
                          className="form-select"
                          aria-label="Default select Project Category"
                        >
                          <option selected="">Project Name Select</option>
                          <option value={1}>Fast Cad</option>
                          <option value={2}>Box of Crayons</option>
                          <option value={3}>Gob Geeklords</option>
                          <option value={4}>Java Dalia</option>
                          <option value={5}>Practice to Perfect</option>
                          <option value={6}>Rhinestone</option>
                          <option value={7}>Social Geek Made</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Task Category</label>
                        <select
                          className="form-select"
                          aria-label="Default select Project Category"
                        >
                          <option selected="">UI/UX Design</option>
                          <option value={1}>Website Design</option>
                          <option value={2}>App Development</option>
                          <option value={3}>Quality Assurance</option>
                          <option value={4}>Development</option>
                          <option value={5}>Backend Development</option>
                          <option value={6}>Software Testing</option>
                          <option value={7}>Website Design</option>
                          <option value={8}>Marketing</option>
                          <option value={9}>SEO</option>
                          <option value={10}>Other</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="formFileMultipleone"
                          className="form-label"
                        >
                          Task Images &amp; Document
                        </label>
                        <input
                          className="form-control"
                          type="file"
                          id="formFileMultipleone"
                          multiple=""
                        />
                      </div>
                      <div className="deadline-form mb-3">
                        <form>
                          <div className="row">
                            <div className="col">
                              <label
                                htmlFor="datepickerded"
                                className="form-label"
                              >
                                Task Start Date
                              </label>
                              <input
                                type="date"
                                className="form-control"
                                id="datepickerded"
                              />
                            </div>
                            <div className="col">
                              <label
                                htmlFor="datepickerdedone"
                                className="form-label"
                              >
                                Task End Date
                              </label>
                              <input
                                type="date"
                                className="form-control"
                                id="datepickerdedone"
                              />
                            </div>
                          </div>
                        </form>
                      </div>
                      <div className="row g-3 mb-3">
                        <div className="col-sm">
                          <label className="form-label">
                            Task Assign Person
                          </label>
                          <select
                            className="form-select"
                            multiple=""
                            aria-label="Default select Priority"
                          >
                            <option selected="">Lucinda Massey</option>
                            <option value={1}>Ryan Nolan</option>
                            <option value={2}>Oliver Black</option>
                            <option value={3}>Adam Walker</option>
                            <option value={4}>Brian Skinner</option>
                            <option value={5}>Dan Short</option>
                            <option value={5}>Jack Glover</option>
                          </select>
                        </div>
                      </div>
                      <div className="row g-3 mb-3">
                        <div className="col-sm">
                          <label className="form-label">Task Priority</label>
                          <select
                            className="form-select"
                            aria-label="Default select Priority"
                          >
                            <option selected="">Highest</option>
                            <option value={1}>Medium</option>
                            <option value={2}>Low</option>
                            <option value={3}>Lowest</option>
                          </select>
                        </div>
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlTextarea786"
                          className="form-label"
                        >
                          Description (optional)
                        </label>
                        <textarea
                          className="form-control"
                          id="exampleFormControlTextarea786"
                          rows={3}
                          placeholder="Add any extra details about the request"
                          defaultValue={""}
                        />
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Done
                      </button>
                      <button type="button" className="btn btn-primary">
                        Create
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* Modal  Delete Task*/}
              <div
                className="modal fade"
                id="dremovetask"
                tabIndex={-1}
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered modal-md modal-dialog-scrollable">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5
                        className="modal-title  fw-bold"
                        id="dremovetaskLabel"
                      >
                        {" "}
                        Delete Task Permanently?
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      />
                    </div>
                    <div className="modal-body justify-content-center flex-column d-flex">
                      <i className="icofont-ui-delete text-danger display-2 text-center mt-2" />
                      <p className="mt-4 fs-5 text-center">
                        You can only delete this Task Permanently
                      </p>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger color-fff"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          </>
        </div>
      </div>
    </>
  );
};

export default Tasks;

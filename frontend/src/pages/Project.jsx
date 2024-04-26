import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import axios from "axios";

const Project = () => {
  // CREATE PROJECT
  const [formData, setFormData] = useState({
    projectName: "",
    // projectCategory: "",
    projectImages: [],
    projectStartDate: "",
    projectEndDate: "",
    // taskAssignPerson: "",
    description: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      projectImage: e.target.files[0],
    });
  };

  const handleSubmit = async () => {
    try {
      const formDataToSend = new FormData();
      for (let key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      const response = await axios.post(
        "http://localhost:8000/api/projects",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      window.location.reload();
      // Handle successful response
    } catch (error) {
      console.error("Error:", error);
      // Handle error
      setError("An error occurred. Please try again later.");
    }
  };

  // GET ALL PROJECTS
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/projects");
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

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
                    <div className="card-header p-0 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
                      <h3 className="fw-bold py-3 mb-0">Projects</h3>
                      <div className="d-flex py-2 project-tab flex-wrap w-sm-100">
                        <button
                          type="button"
                          className="btn btn-dark w-sm-100"
                          data-bs-toggle="modal"
                          data-bs-target="#createproject"
                        >
                          <i className="icofont-plus-circle me-2 fs-6" />
                          Create Project
                        </button>
                        <ul
                          className="nav nav-tabs tab-body-header rounded ms-3 prtab-set w-sm-100"
                          role="tablist"
                        >
                          <li className="nav-item">
                            <a
                              className="nav-link active"
                              data-bs-toggle="tab"
                              href="#All-list"
                              role="tab"
                            >
                              All
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              data-bs-toggle="tab"
                              href="#Started-list"
                              role="tab"
                            >
                              Started
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              data-bs-toggle="tab"
                              href="#Approval-list"
                              role="tab"
                            >
                              Approval
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              data-bs-toggle="tab"
                              href="#Completed-list"
                              role="tab"
                            >
                              Completed
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>{" "}
                {/* Row end  */}
                <div className="row align-items-center">
                  <div className="col-lg-12 col-md-12 flex-column">
                    <div className="tab-content mt-4">
                      <div className="tab-pane fade show active" id="All-list">
                        <div className="row g-3 gy-5 py-3 row-deck">
                            {projects.map((project) => (
                          <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6" key={project.id}>
                              <div className="card">
                                <div className="card-body">
                                  <div className="d-flex align-items-center justify-content-between mt-5">
                                    <div className="lesson_name">
                                      <div className="project-block light-info-bg">
                                        <i className="icofont-paint" />
                                      </div>
                                      <span className="small text-muted project_name fw-bold">
                                        {" "}
                                        Social Geek Made{" "}
                                      </span>
                                      <h6 className="mb-0 fw-bold  fs-6  mb-2">
                                        {project.projectName}
                                      </h6>
                                    </div>
                                    <div
                                      className="btn-group"
                                      role="group"
                                      aria-label="Basic outlined example"
                                    >
                                      <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        data-bs-toggle="modal"
                                        data-bs-target="#editproject"
                                      >
                                        <i className="icofont-edit text-success" />
                                      </button>
                                      <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        data-bs-toggle="modal"
                                        data-bs-target="#deleteproject"
                                      >
                                        <i className="icofont-ui-delete text-danger" />
                                      </button>
                                    </div>
                                  </div>
                                  <div className="d-flex align-items-center">
                                    <div className="avatar-list avatar-list-stacked pt-2">
                                      <img
                                        className="avatar rounded-circle sm"
                                        src={
                                          "http://localhost:8000/" +
                                          project.projectImage
                                        }
                                        alt=""
                                      />
                                      {/* <span
                                      className="avatar rounded-circle text-center pointer sm"
                                      data-bs-toggle="modal"
                                      data-bs-target="#addUser"
                                    >
                                      <i className="icofont-ui-add" />
                                    </span> */}
                                    </div>
                                  </div>
                                  <div className="row g-2 pt-4">
                                    <div className="col-6">
                                      <div className="d-flex align-items-center">
                                        <i className="icofont-paper-clip" />
                                        <span className="ms-2">
                                          {project.projectStartDate}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="col-6">
                                      <div className="d-flex align-items-center">
                                        <i className="icofont-sand-clock" />
                                        <span className="ms-2">
                                          {project.projectEndDate}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="col-6">
                                      <div className="d-flex align-items-center">
                                        <i className="icofont-group-students " />
                                        <span className="ms-2">5 Members</span>
                                      </div>
                                    </div>
                                    <div className="col-6">
                                      <div className="d-flex align-items-center">
                                        <i className="icofont-ui-text-chat" />
                                        <span className="ms-2">10</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="dividers-block" />
                                  {project.description}
                                </div>
                              </div>
                          </div>
                            ))}
                        </div>
                      </div>
                      <div className="tab-pane fade" id="Started-list">
                        <div className="row g-3 gy-5 py-3 row-deck">
                          <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                            <div className="card">
                              <div className="card-body">
                                <div className="d-flex align-items-center justify-content-between mt-5">
                                  <div className="lesson_name">
                                    <div className="project-block light-info-bg">
                                      <i className="icofont-paint" />
                                    </div>
                                    <span className="small text-muted project_name fw-bold">
                                      {" "}
                                      Social Geek Made{" "}
                                    </span>
                                    <h6 className="mb-0 fw-bold  fs-6  mb-2">
                                      UI/UX Design
                                    </h6>
                                  </div>
                                  <div
                                    className="btn-group"
                                    role="group"
                                    aria-label="Basic outlined example"
                                  >
                                    <button
                                      type="button"
                                      className="btn btn-outline-secondary"
                                      data-bs-toggle="modal"
                                      data-bs-target="#editproject"
                                    >
                                      <i className="icofont-edit text-success" />
                                    </button>
                                    <button
                                      type="button"
                                      className="btn btn-outline-secondary"
                                      data-bs-toggle="modal"
                                      data-bs-target="#deleteproject"
                                    >
                                      <i className="icofont-ui-delete text-danger" />
                                    </button>
                                  </div>
                                </div>
                                <div className="d-flex align-items-center">
                                  <div className="avatar-list avatar-list-stacked pt-2">
                                    <img
                                      className="avatar rounded-circle sm"
                                      src="assets/images/xs/avatar2.jpg"
                                      alt=""
                                    />
                                    <img
                                      className="avatar rounded-circle sm"
                                      src="assets/images/xs/avatar1.jpg"
                                      alt=""
                                    />
                                    <img
                                      className="avatar rounded-circle sm"
                                      src="assets/images/xs/avatar3.jpg"
                                      alt=""
                                    />
                                    <img
                                      className="avatar rounded-circle sm"
                                      src="assets/images/xs/avatar4.jpg"
                                      alt=""
                                    />
                                    <img
                                      className="avatar rounded-circle sm"
                                      src="assets/images/xs/avatar8.jpg"
                                      alt=""
                                    />
                                    <span
                                      className="avatar rounded-circle text-center pointer sm"
                                      data-bs-toggle="modal"
                                      data-bs-target="#addUser"
                                    >
                                      <i className="icofont-ui-add" />
                                    </span>
                                  </div>
                                </div>
                                <div className="row g-2 pt-4">
                                  <div className="col-6">
                                    <div className="d-flex align-items-center">
                                      <i className="icofont-paper-clip" />
                                      <span className="ms-2">5 Attach</span>
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="d-flex align-items-center">
                                      <i className="icofont-sand-clock" />
                                      <span className="ms-2">4 Month</span>
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="d-flex align-items-center">
                                      <i className="icofont-group-students " />
                                      <span className="ms-2">5 Members</span>
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="d-flex align-items-center">
                                      <i className="icofont-ui-text-chat" />
                                      <span className="ms-2">10</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="dividers-block" />
                                <div className="d-flex align-items-center justify-content-between mb-2">
                                  <h4 className="small fw-bold mb-0">
                                    Progress
                                  </h4>
                                  <span className="small light-danger-bg  p-1 rounded">
                                    <i className="icofont-ui-clock" /> 35 Days
                                    Left
                                  </span>
                                </div>
                                <div className="progress" style={{ height: 8 }}>
                                  <div
                                    className="progress-bar bg-secondary"
                                    role="progressbar"
                                    style={{ width: "25%" }}
                                    aria-valuenow={15}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                  />
                                  <div
                                    className="progress-bar bg-secondary ms-1"
                                    role="progressbar"
                                    style={{ width: "25%" }}
                                    aria-valuenow={30}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                  />
                                  <div
                                    className="progress-bar bg-secondary ms-1"
                                    role="progressbar"
                                    style={{ width: "10%" }}
                                    aria-valuenow={10}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="tab-pane fade" id="Approval-list">
                        <div className="row g-3 gy-5 py-3 row-deck">
                          <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                            <div className="card">
                              <div className="card-body">
                                <div className="d-flex align-items-center justify-content-between mt-5">
                                  <div className="lesson_name">
                                    <div className="project-block light-info-bg">
                                      <i className="icofont-paint" />
                                    </div>
                                    <span className="small text-muted project_name fw-bold">
                                      {" "}
                                      Software Chasers{" "}
                                    </span>
                                    <h6 className="mb-0 fw-bold  fs-6  mb-2">
                                      UI/UX Design
                                    </h6>
                                  </div>
                                  <div
                                    className="btn-group"
                                    role="group"
                                    aria-label="Basic outlined example"
                                  >
                                    <button
                                      type="button"
                                      className="btn btn-outline-secondary"
                                      data-bs-toggle="modal"
                                      data-bs-target="#editproject"
                                    >
                                      <i className="icofont-edit text-success" />
                                    </button>
                                    <button
                                      type="button"
                                      className="btn btn-outline-secondary"
                                      data-bs-toggle="modal"
                                      data-bs-target="#deleteproject"
                                    >
                                      <i className="icofont-ui-delete text-danger" />
                                    </button>
                                  </div>
                                </div>
                                <div className="d-flex align-items-center">
                                  <div className="avatar-list avatar-list-stacked pt-2">
                                    <img
                                      className="avatar rounded-circle sm"
                                      src="assets/images/xs/avatar2.jpg"
                                      alt=""
                                    />
                                    <img
                                      className="avatar rounded-circle sm"
                                      src="assets/images/xs/avatar1.jpg"
                                      alt=""
                                    />
                                    <img
                                      className="avatar rounded-circle sm"
                                      src="assets/images/xs/avatar3.jpg"
                                      alt=""
                                    />
                                    <img
                                      className="avatar rounded-circle sm"
                                      src="assets/images/xs/avatar4.jpg"
                                      alt=""
                                    />
                                    <img
                                      className="avatar rounded-circle sm"
                                      src="assets/images/xs/avatar8.jpg"
                                      alt=""
                                    />
                                    <span
                                      className="avatar rounded-circle text-center pointer sm"
                                      data-bs-toggle="modal"
                                      data-bs-target="#addUser"
                                    >
                                      <i className="icofont-ui-add" />
                                    </span>
                                  </div>
                                </div>
                                <div className="row g-2 pt-4">
                                  <div className="col-6">
                                    <div className="d-flex align-items-center">
                                      <i className="icofont-paper-clip" />
                                      <span className="ms-2">5 Attach</span>
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="d-flex align-items-center">
                                      <i className="icofont-sand-clock" />
                                      <span className="ms-2">4 Month</span>
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="d-flex align-items-center">
                                      <i className="icofont-group-students " />
                                      <span className="ms-2">5 Members</span>
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="d-flex align-items-center">
                                      <i className="icofont-ui-text-chat" />
                                      <span className="ms-2">10</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="dividers-block" />
                                <div className="d-flex align-items-center justify-content-between mb-2">
                                  <h4 className="small fw-bold mb-0">
                                    Progress
                                  </h4>
                                  <span className="small light-warning-bg  p-1 rounded">
                                    <i className="icofont-ui-clock" /> Approval
                                  </span>
                                </div>
                                <div className="progress" style={{ height: 8 }}>
                                  <div
                                    className="progress-bar bg-secondary"
                                    role="progressbar"
                                    style={{ width: "0%" }}
                                    aria-valuenow={15}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                  />
                                  <div
                                    className="progress-bar bg-secondary ms-1"
                                    role="progressbar"
                                    style={{ width: "0%" }}
                                    aria-valuenow={30}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                  />
                                  <div
                                    className="progress-bar bg-secondary ms-1"
                                    role="progressbar"
                                    style={{ width: "0%" }}
                                    aria-valuenow={80}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="tab-pane fade" id="Completed-list">
                        <div className="row g-3 gy-5 py-3 row-deck">
                          <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                            <div className="card">
                              <div className="card-body">
                                <div className="d-flex align-items-center justify-content-between mt-5">
                                  <div className="lesson_name">
                                    <div className="project-block light-info-bg">
                                      <i className="icofont-paint" />
                                    </div>
                                    <span className="small text-muted project_name fw-bold">
                                      {" "}
                                      Sunburst{" "}
                                    </span>
                                    <h6 className="mb-0 fw-bold  fs-6  mb-2">
                                      UI/UX Design
                                    </h6>
                                  </div>
                                  <div
                                    className="btn-group"
                                    role="group"
                                    aria-label="Basic outlined example"
                                  >
                                    <button
                                      type="button"
                                      className="btn btn-outline-secondary"
                                      data-bs-toggle="modal"
                                      data-bs-target="#deleteproject"
                                    >
                                      <i className="icofont-ui-delete text-danger" />
                                    </button>
                                  </div>
                                </div>
                                <div className="d-flex align-items-center">
                                  <div className="avatar-list avatar-list-stacked pt-2">
                                    <img
                                      className="avatar rounded-circle sm"
                                      src="assets/images/xs/avatar2.jpg"
                                      alt=""
                                    />
                                    <img
                                      className="avatar rounded-circle sm"
                                      src="assets/images/xs/avatar1.jpg"
                                      alt=""
                                    />
                                    <img
                                      className="avatar rounded-circle sm"
                                      src="assets/images/xs/avatar3.jpg"
                                      alt=""
                                    />
                                    <img
                                      className="avatar rounded-circle sm"
                                      src="assets/images/xs/avatar4.jpg"
                                      alt=""
                                    />
                                    <img
                                      className="avatar rounded-circle sm"
                                      src="assets/images/xs/avatar8.jpg"
                                      alt=""
                                    />
                                  </div>
                                </div>
                                <div className="row g-2 pt-4">
                                  <div className="col-6">
                                    <div className="d-flex align-items-center">
                                      <i className="icofont-paper-clip" />
                                      <span className="ms-2">5 Attach</span>
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="d-flex align-items-center">
                                      <i className="icofont-sand-clock" />
                                      <span className="ms-2 text-success">
                                        Completed
                                      </span>
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="d-flex align-items-center">
                                      <i className="icofont-group-students " />
                                      <span className="ms-2">5 Members</span>
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="d-flex align-items-center">
                                      <i className="icofont-ui-text-chat" />
                                      <span className="ms-2">10</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="dividers-block" />
                                <div className="d-flex align-items-center justify-content-between mb-2">
                                  <h4 className="small fw-bold mb-0">
                                    Progress
                                  </h4>
                                  <span className="small light-success-bg  p-1 rounded">
                                    <i className="icofont-ui-clock" /> Completed
                                  </span>
                                </div>
                                <div className="progress" style={{ height: 8 }}>
                                  <div
                                    className="progress-bar bg-secondary"
                                    role="progressbar"
                                    style={{ width: "25%" }}
                                    aria-valuenow={15}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                  />
                                  <div
                                    className="progress-bar bg-secondary ms-1"
                                    role="progressbar"
                                    style={{ width: "25%" }}
                                    aria-valuenow={30}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                  />
                                  <div
                                    className="progress-bar bg-secondary ms-1"
                                    role="progressbar"
                                    style={{ width: "50%" }}
                                    aria-valuenow={39}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Create Project*/}

            <div
              className="modal fade"
              id="createproject"
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
                      Create Project
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
                      <label
                        htmlFor="exampleFormControlInput77"
                        className="form-label"
                      >
                        Project Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleFormControlInput77"
                        placeholder="Explain what the Project Name"
                        name="projectName"
                        value={formData.projectName}
                        onChange={handleChange}
                      />
                    </div>
                    {/* <div className="mb-3">
                      <label className="form-label">Project Category</label>
                      <select
                        className="form-select"
                        aria-label="Default select Project Category"
                        name="projectCategory"
                        value={formData.projectCategory}
                        onChange={handleChange}
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
                    </div> */}
                    <div className="mb-3">
                      <label
                        htmlFor="formFileMultipleone"
                        className="form-label"
                      >
                        Project Images &amp; Document
                      </label>
                      <input
                        className="form-control"
                        type="file"
                        id="formFileMultipleone"
                        multiple=""
                        name="projectImages"
                        onChange={handleFileChange}
                      />
                    </div>
                    <div className="deadline-form">
                      <form>
                        <div className="row g-3 mb-3">
                          <div className="col">
                            <label
                              htmlFor="datepickerded"
                              className="form-label"
                            >
                              Project Start Date
                            </label>
                            <input
                              type="date"
                              className="form-control"
                              id="datepickerded"
                              name="projectStartDate"
                              value={formData.projectStartDate}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="col">
                            <label
                              htmlFor="datepickerdedone"
                              className="form-label"
                            >
                              Project End Date
                            </label>
                            <input
                              type="date"
                              className="form-control"
                              id="datepickerdedone"
                              name="projectEndDate"
                              value={formData.projectEndDate}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        {/* <div className="row g-3 mb-3">
                          <div className="col-sm-12">
                            <label
                              htmlFor="formFileMultipleone"
                              className="form-label"
                            >
                              Task Assign Person
                            </label>
                            <select
                              className="form-select"
                              multiple=""
                              aria-label="Default select Priority"
                              name="taskAssignPerson"
                              value={formData.taskAssignPerson}
                              onChange={handleChange}
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
                        </div> */}
                      </form>
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleFormControlTextarea78"
                        className="form-label"
                      >
                        Description (optional)
                      </label>
                      <textarea
                        className="form-control"
                        id="exampleFormControlTextarea78"
                        rows={3}
                        placeholder="Add any extra details about the request"
                        defaultValue={""}
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
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
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleSubmit}
                    >
                      Create
                    </button>
                  </div>
                  {error && <p>{error}</p>}
                </div>
              </div>
            </div>

            {/* <div className="modal fade" id="createproject" tabIndex={-1} aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-md modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title fw-bold" id="createprojectlLabel">
              Create Project
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="projectName" className="form-label">Project Name</label>
              <input type="text" className="form-control" id="projectName" name="projectName" value={formData.projectName} onChange={handleChange} placeholder="Explain what the Project Name" />
            </div>
            <div className="mb-3">
              <label className="form-label">Project Category</label>
              <select className="form-select" name="projectCategory" value={formData.projectCategory} onChange={handleChange} aria-label="Default select Project Category">
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="Website Design">Website Design</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="projectImages" className="form-label">Project Images &amp; Document</label>
              <input className="form-control" type="file" id="projectImages" name="projectImages" onChange={handleFileChange} multiple />
            </div>
            <div className="deadline-form">
              <div className="row g-3 mb-3">
                <div className="col">
                  <label htmlFor="projectStartDate" className="form-label">Project Start Date</label>
                  <input type="date" className="form-control" id="projectStartDate" name="projectStartDate" value={formData.projectStartDate} onChange={handleChange} />
                </div>
                <div className="col">
                  <label htmlFor="projectEndDate" className="form-label">Project End Date</label>
                  <input type="date" className="form-control" id="projectEndDate" name="projectEndDate" value={formData.projectEndDate} onChange={handleChange} />
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description (optional)</label>
              <textarea className="form-control" id="description" name="description" rows={3} value={formData.description} onChange={handleChange} placeholder="Add any extra details about the request"></textarea>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Done</button>
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>Create</button>
          </div>
          {error && <p>{error}</p>}
        </div>
      </div>
    </div> */}

            {/* Edit Project*/}
            <div
              className="modal fade"
              id="editproject"
              tabIndex={-1}
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered modal-md modal-dialog-scrollable">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title  fw-bold" id="editprojectLabel">
                      {" "}
                      Edit Project
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
                      <label
                        htmlFor="exampleFormControlInput78"
                        className="form-label"
                      >
                        Project Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleFormControlInput78"
                        defaultValue="Social Geek Made"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Project Category</label>
                      <select
                        className="form-select"
                        aria-label="Default select example"
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
                        htmlFor="formFileMultiple456"
                        className="form-label"
                      >
                        Project Images &amp; Document
                      </label>
                      <input
                        className="form-control"
                        type="file"
                        id="formFileMultiple456"
                      />
                    </div>
                    <div className="deadline-form">
                      <form>
                        <div className="row g-3 mb-3">
                          <div className="col">
                            <label
                              htmlFor="datepickerded123"
                              className="form-label"
                            >
                              Project Start Date
                            </label>
                            <input
                              type="date"
                              className="form-control"
                              id="datepickerded123"
                              defaultValue="2021-01-10"
                            />
                          </div>
                          <div className="col">
                            <label
                              htmlFor="datepickerded456"
                              className="form-label"
                            >
                              Project End Date
                            </label>
                            <input
                              type="date"
                              className="form-control"
                              id="datepickerded456"
                              defaultValue="2021-04-10"
                            />
                          </div>
                        </div>
                        <div className="row g-3 mb-3">
                          <div className="col-sm-12">
                            <label className="form-label">
                              Notifation Sent
                            </label>
                            <select
                              className="form-select"
                              aria-label="Default select example"
                            >
                              <option selected="">All</option>
                              <option value={1}>Team Leader Only</option>
                              <option value={2}>Team Member Only</option>
                            </select>
                          </div>
                          <div className="col-sm-12">
                            <label
                              htmlFor="formFileMultipleone"
                              className="form-label"
                            >
                              Task Assign Person
                            </label>
                            <select
                              className="form-select"
                              multiple=""
                              aria-label="Default select Priority"
                            >
                              <option selected="">Lucinda Massey</option>
                              <option selected="" value={1}>
                                Ryan Nolan
                              </option>
                              <option selected="" value={2}>
                                Oliver Black
                              </option>
                              <option selected="" value={3}>
                                Adam Walker
                              </option>
                              <option selected="" value={4}>
                                Brian Skinner
                              </option>
                              <option value={5}>Dan Short</option>
                              <option value={5}>Jack Glover</option>
                            </select>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className="row g-3 mb-3">
                      <div className="col-sm">
                        <label
                          htmlFor="formFileMultipleone"
                          className="form-label"
                        >
                          Priority
                        </label>
                        <select
                          className="form-select"
                          aria-label="Default select Priority"
                        >
                          <option selected="">Medium</option>
                          <option value={1}>Highest</option>
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
                        defaultValue={
                          "Social Geek Made,lorem urna commodo sem. Pellentesque venenatis leo quam, sed mattis sapien lobortis ut. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere\n                        "
                        }
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
            {/* Modal  Delete Folder/ File*/}
            <div
              className="modal fade"
              id="deleteproject"
              tabIndex={-1}
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered modal-md modal-dialog-scrollable">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5
                      className="modal-title  fw-bold"
                      id="deleteprojectLabel"
                    >
                      {" "}
                      Delete item Permanently?
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
                      You can only delete this item Permanently
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
                    <button type="button" className="btn btn-danger color-fff">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        </div>
      </div>
    </>
  );
};

export default Project;

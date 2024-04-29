import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import axios from "axios";

const Project = () => {
  // CREATE PROJECT
  const [formData, setFormData] = useState({
    projectName: "",
    projectCategory: "",
    projectImages: null,
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
    } catch (error) {
      console.error("Error:", error);
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

  //DELETE PROJECT
  const [deletableId, setDeletableId] = useState("");

  const handleDeleteProject = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/projects/${deletableId}`
      );
      console.log(response.data);
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //UPDATE PROJECT
  const [projectFormData, setProjectFormData] = useState({
    projectName: "",
    projectCategory: "",
    projectImage: null,
    projectStartDate: "",
    projectEndDate: "",
    // taskAssignPerson: '',
    description: "",
  });

  const projectHandleChange = (e) => {
    const { name, value, files } = e.target;
    setProjectFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };
  const [toEdit, setToEdit] = useState("");
  const projectHandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      for (const key in projectFormData) {
        formDataToSend.append(key, projectFormData[key]);
      }
      console.log(projectFormData);
      const response = await axios.put(
        `http://localhost:8000/api/projects/${toEdit}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // GET SINGLE PROJECT
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = async (searchQuery) => {
    if (searchQuery !== "") {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/pro/search?id=${searchQuery}`
        );
        setProjects(response.data);
      } catch (error) {
        console.error("Error:", error);
        setProjects(null);
      }
    } else {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            "http://localhost:8000/api/projects"
          );
          setProjects(response.data);
        } catch (error) {
          console.error("Error:", error);
        }
      };

      fetchData();
    }
  };

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
                    <div className="card-header py-3 px-0 d-sm-flex align-items-center  justify-content-between border-bottom">
                      <h3 className="fw-bold py-3 mb-0">Projects</h3>
                      <div className="d-flex me-2">
                        <button
                          type="button"
                          className="btn btn-dark me-1 w-sm-100"
                          data-bs-toggle="modal"
                          data-bs-target="#createproject"
                        >
                          <i className="icofont-plus-circle me-2 fs-6" />
                          Create Project
                        </button>
                        <div className="order-0 ">
                          <div className="input-group">
                            <input
                              type="search"
                              className="form-control"
                              aria-label="search"
                              aria-describedby="addon-wrapping"
                              value={searchQuery}
                              onChange={(e) => {
                                setSearchQuery(e.target.value);
                                handleSearch(e.target.value);
                              }}
                              placeholder="Enter Project Name"
                            />
                            <button
                              type="button"
                              className="input-group-text add-member-top"
                              id="addon-wrappingone"
                              data-bs-toggle="modal"
                              data-bs-target="#addUser"
                            >
                              <i className="fa fa-plus" />
                            </button>
                            <button
                              type="button"
                              className="input-group-text"
                              id="addon-wrapping"
                              onClick={handleSearch}
                            >
                              <i className="fa fa-search" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>{" "}
                {/* Row end  */}
                <div className="row g-3 mb-3 row-deck">
                  <div className="col-md-12">
                    <div className="card mb-3">
                      {/* <div className="card-header py-3 d-flex justify-content-between align-items-center">
                        <div className="info-header">
                          <h6 className="mb-0 fw-bold ">Project Information</h6>
                        </div>
                      </div> */}
                      <div className="card-body">
                        <table
                          className="table table-hover align-middle mb-0"
                          style={{ width: "100%" }}
                        >
                          <thead>
                            <tr>
                              <th>Project Name</th>
                              <th>Project Category</th>
                              <th>Start Date</th>
                              <th>End Date</th>
                              <th>Members</th>
                              <th>Edit</th>
                              <th>Delete</th>
                            </tr>
                          </thead>
                          <tbody>
                            {projects.map((project) => {
                              const getFormattedDate = (date) => {
                                const newDate = new Date(date);
                                const day = newDate.getDate();
                                const month = newDate.getMonth() + 1;
                                const year = newDate.getFullYear();

                                return `${day}/${month}/${year}`;
                              };

                              return (
                                <tr key={project.id}>
                                  <td>
                                    <Link to="">{project.projectName}</Link>
                                  </td>
                                  <td>{project.projectCategory}</td>
                                  <td>
                                    {getFormattedDate(project.projectStartDate)}
                                  </td>
                                  <td>
                                    {getFormattedDate(project.projectEndDate)}{" "}
                                  </td>
                                  <td>
                                    <img
                                      className="avatar rounded-circle sm"
                                      src={
                                        "http://localhost:8000/" +
                                        project.projectImage
                                      }
                                      alt=""
                                    />

                                    {/* <a href="#">Keith</a> */}
                                  </td>
                                  <td>
                                    <button
                                      type=""
                                      onClick={() => setToEdit(project._id)}
                                      className="btn icofont-edit text-success"
                                      data-bs-toggle="modal"
                                      data-bs-target="#editproject"
                                    ></button>
                                  </td>
                                  <td>
                                    <button
                                      type=""
                                      className="btn outline-secondary icofont-ui-delete text-danger "
                                      data-bs-toggle="modal"
                                      data-bs-target="#deleteproject"
                                      onClick={() => {
                                        setDeletableId(project._id);
                                      }}
                                    ></button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
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
                    <div className="mb-3">
                      <label className="form-label">Project Category</label>
                      <select
                        className="form-select"
                        aria-label="Default select Project Category"
                        name="projectCategory"
                        value={formData.projectCategory}
                        onChange={handleChange}
                      >
                        <option selected=""></option>
                        <option value={"UI/UX Design"}>UI/UX Design</option>
                        <option value={"Website Design"}>Website Design</option>
                        <option value={"App Development"}>
                          App Development
                        </option>
                        <option value={"Quality Assurance"}>
                          Quality Assurance
                        </option>
                        <option value={"Development"}>Development</option>
                        <option value={"Backend Development"}>
                          Backend Development
                        </option>
                        <option value={"Software Testing"}>
                          Software Testing
                        </option>
                        <option value={"Website Design"}>Website Design</option>
                        <option value={"Marketing"}>Marketing</option>
                        <option value={"SEO"}>SEO</option>
                        <option value={"Other"}>Other</option>
                      </select>
                    </div>
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
                        <div className="row g-3 mb-3">
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
                        </div>
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

            {/* Update Project*/}
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
                        placeholder="Project Name"
                        name="projectName"
                        value={projectFormData.projectName}
                        onChange={projectHandleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Project Category</label>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        name="projectCategory"
                        value={projectFormData.projectCategory}
                        onChange={projectHandleChange}
                      >
                        <option selected=""></option>
                        <option value={"UI/UX Design"}>UI/UX Design</option>
                        <option value={"Website Design"}>Website Design</option>
                        <option value={"App Development"}>
                          App Development
                        </option>
                        <option value={"Quality Assurance"}>
                          Quality Assurance
                        </option>
                        <option value={"Development"}>Development</option>
                        <option value={"Backend Development"}>
                          Backend Development
                        </option>
                        <option value={"Software Testing"}>
                          Software Testing
                        </option>
                        <option value={"Website Design"}>Website Design</option>
                        <option value={"Marketing"}>Marketing</option>
                        <option value={"SEO"}>SEO</option>
                        <option value={"Other"}>Other</option>
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
                        name="projectImages"
                        onChange={handleFileChange}
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
                              name="projectStartDate"
                              value={projectFormData.projectStartDate}
                              onChange={projectHandleChange}
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
                              name="projectEndDate"
                              value={projectFormData.projectEndDate}
                              onChange={projectHandleChange}
                            />
                          </div>
                        </div>
                        <div className="row g-3 mb-3">
                          {/* <div className="col-sm-12">
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
                          </div> */}
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
                    {/* <div className="row g-3 mb-3">
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
                    </div> */}
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
                        placeholder="Enter your task description"
                        name="description"
                        value={projectFormData.description}
                        onChange={projectHandleChange}
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
                      onClick={projectHandleSubmit}
                    >
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
                    <button
                      type="button"
                      className="btn btn-danger color-fff"
                      onClick={handleDeleteProject}
                    >
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

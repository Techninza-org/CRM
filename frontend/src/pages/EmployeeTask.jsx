import React, { useState, useEffect } from "react";
import Sidebar from "../employeeCompt/EmployeeSidebar";
import Header from "../employeeCompt/EmployeeHeader";
import axios from "axios";
import { Link } from "react-router-dom";

const Tasks = () => {

  // GET SINGLE TASK BY TOKEN
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = async (searchQuery) => {
    const Token = localStorage.getItem("emp_token");
    if (searchQuery !== "") {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}api/pros/search?id=${searchQuery}`,
          {
            headers: {
              Authorization: Token,
            },
          }
        );
        setTasks(response.data);
      } catch (error) {
        console.error("Error:", error);
        setTasks(null);
      }
    } else {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}api/tasks`, {
          headers: {
            Authorization: Token,
          },
        });
        setTasks(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}api/employees`);
        setEmployees(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  const [selectedEmployees, setSelectedEmployees] = useState([]);
  // console.log(selectedEmployees);
  const assignEmployee = employees.map((emp) => {
    return {
      label: emp.employeeName,
      value: emp._id,
    };
  });

  //GET A TASK BY TOKEN
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const Token = localStorage.getItem("emp_token");
    async function fetchTasks() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}api/author`, {
          headers: {
            Authorization: Token,
          },
        });
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }

    fetchTasks();
  }, []);

  //Progress task
  // const [taskId, setTaskId] = useState("");
  const [taskStatuses, setTaskStatuses] = useState({});

  useEffect(() => {
    // Initialize taskStatuses with existing task statuses
    const statuses = {};
    tasks.forEach(task => {
      statuses[task._id] = task.taskStatus;
    });
    setTaskStatuses(statuses);
  }, [tasks]);

  const handleTaskUpdate = async (event, id) => {
    const { value } = event.target;
    let isCompleted = false;

    // Determine the completion status based on the selected value
    if (value === "Completed") {
      isCompleted = true;
    } else if (value === "Not Started" || value === "In Progress") {
      isCompleted = false;
    }

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}api/update/${id}`,
        { taskStatus: value, isCompleted }
      );

      setTasks(
        tasks.map((task) =>
          task._id === id ? { ...task, taskStatus: value, isCompleted } : task
        )
      );

      // Update task status in local state for refreshing purpose
      setTaskStatuses({
        ...taskStatuses,
        [id]: value
      });
    } catch (error) {
      setError(error.message);
    }
  };

  const [showFullDescription, setShowFullDescription] = useState("");



  // Status
  const [currentStatus, setCurrentStatus] = useState("");
  const [user_id, setUser_id] = useState("");
  const [task_id, setTask_id] = useState("");
  const [selectTask, setSelectTask] = useState([]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/task-status`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentStatus,
          user_id: loginUserId,
          task_id: selectTask._id,
        }),
      });
      // console.log(response.json);

      if (!response.ok) {
        throw new Error("Failed to add project status");
      }


      setCurrentStatus("");
      setUser_id("");
      setTask_id("");

      // Close the modal programmatically
      const modalElement = document.getElementById("addUser");
      const modal = window.bootstrap.Modal.getInstance(modalElement);
      modal.hide();



      toast.success('Status Added Successfully!', {
        style: {
          backgroundColor: '#4c3575',
          color: 'white',
        },
      });

      window.location.reload()


    } catch (error) {
      console.error(error.message);
    }
  };

  const [taskStatus, setTaskStatus] = useState([]);
  const [taskId, setTaskId] = useState("");

  useEffect(() => {
    const fetchProjectStatuses = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}api/project-status/${taskId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch project statuses");
        }

        const data = await response.json();
        setTaskStatus(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    if (taskId) {
      fetchProjectStatuses();
    }
  }, [taskId]);


  // Delete Status
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}api/project-status/${taskId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.message);
      }

      console.log("Project status deleted successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting project status:", error.message);
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
                    <div className="card-header py-3 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
                      <h3 className="fw-bold mb-0">Task Management</h3>
                      <div className="col-auto d-flex w-sm-100">
                        {/* <button
                          type="button"
                          className="btn btn-dark btn-set-task w-sm-100 me-2"
                          data-bs-toggle="modal"
                          data-bs-target="#createtask"
                        >
                          <i className="icofont-plus-circle me-2 fs-6" />
                          Create Task
                        </button> */}
                        <div className="order-0">
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
                <div className="row">
                  {tasks.map((task) => {
                    const getFormattedDate = (date) => {
                      const newDate = new Date(date);
                      const day = newDate.getDate();
                      const month = newDate.getMonth() + 1;
                      const year = newDate.getFullYear();

                      return `${day}/${month}/${year}`;
                    };

                    return (
                      <div className="col-md-4 mb-4" key={task._id}>
                        <div className="card" style={{ width: "18rem" }}>
                          <div className="card-body dd-handle">
                            <div className="d-flex justify-content-between">
                              <h5 className="fw-bold">{task.projectName}</h5>

                            </div>
                            <div className="task-info d-flex align-items-center justify-content-between">
                              <h6 className="py-1 px-2 rounded-1 d-inline-block fw-bold small-14 mb-0">
                                <span className={`badge ${taskStatuses[task._id] === "Not Started" ? "bg-warning text-dark" : taskStatuses[task._id] === "In Progress" ? "bg-info text-dark" : "bg-success"}`}>
                                  {taskStatuses[task._id]}
                                </span>
                              </h6>
                              <div className="task-priority d-flex flex-column align-items-center justify-content-center">
                                <div className="avatar-list avatar-list-stacked m-0">
                                  <img
                                    className="avatar rounded-circle small-avt"
                                    src={`${import.meta.env.VITE_BASE_URL}${task.taskAssignPerson.employeeImage}`}
                                    alt=""
                                  />
                                </div>
                                <div>{task.taskAssignPerson.employeeName}</div>
                                <span className="badge bg-danger text-end mt-2">
                                  {task.taskPriority}
                                </span>
                              </div>
                            </div>
                            <p
                              className="py-2 mb-0 task-description"
                              style={{
                                maxHeight: showFullDescription ? "none" : "11em",
                                overflowY: "auto",
                              }}
                            >
                              {task.description}
                              <button
                                className="d-flex justify-content-center bi bi-stopwatch btn outline-secondary text-primary"
                                data-bs-toggle="modal"
                                data-bs-target="#addUser"
                                onClick={() => {
                                  // console.log("abc: " + project._id);
                                  setTaskId(project._id);
                                  setSelectTask(project);
                                }}
                              ></button>
                            </p>
                            <div className="tikit-info row g-3 align-items-center">
                              <div className="col-sm">
                                <ul className="d-flex list-unstyled align-items-center justify-content-between">
                                  <li className="me-2">
                                    <div className="d-flex align-items-center fw-bold">
                                      End:
                                      <span className="ms-1">
                                        {getFormattedDate(task.taskEndDate)}
                                      </span>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                              <div className="d-flex justify-content-between align-items-center">

                                <select
                                  className="form-select"
                                  aria-label="Default select Status"
                                  name="taskStatus"
                                  onChange={(e) => handleTaskUpdate(e, task._id)}
                                  value={taskStatuses[task._id]}
                                >
                                  <option value="Not Started">Not Started</option>
                                  <option value="In Progress">In Progress</option>
                                  <option value="Completed">Completed</option>
                                </select>

                                <div className="btn-group" role="group" aria-label="Basic outlined example">
                                  <Link
                                    to="/images"
                                    className="btn btn-outline-secondary"
                                    state={{
                                      images: task.taskImages,
                                      projectName: task.projectName,
                                    }}
                                  >
                                    <i className="bi-paperclip fs-6" />
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>

              {/* Chat Modal */}
              {/* <div
                className="modal fade"
                id="chatUser"
                tabIndex={-1}
                aria-labelledby="chatUserLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered modal-lg">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5
                        className="modal-title fs-4 fw-bold"
                        id="addUserLabel"
                      >
                        {tasks.projectName}
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      />
                    </div>
                    <div className="modal-body">
                      <div className="members_list">
                        <ul className="list-unstyled list-group list-group-custom list-group-flush mb-0">
                          <li className="list-group-item py-3 text-center text-md-start">
                            {chats.map((chat) => (
                              <li key={chat._id}>{chat.message}</li>
                            ))}
                          </li>
                        </ul>

                        <div className="row g-3 mb-3">
                        </div>
                        <div className="d-flex" style={{ gap: "6px" }}>
                          <textarea
                            rows="1"
                            cols=""
                            type="text"
                            className="form-control"
                            name="taskId"
                            value={formData.taskId}
                            onChange={handleChange}
                          />
                          <button
                            type="button"
                            className="btn btn-dark"
                            onClick={handleSubmit}
                          >
                            Send
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
            {/* Status Modal */}
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
                    <h5 className="modal-title fs-4 fw-bold" id="addUserLabel">
                      {selectTask.projectName}
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    />
                  </div>
                  <div className="modal-body">
                    {/* <div className="inviteby_email">
                      <div className="input-group mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder=""
                          id=""
                          aria-describedby="exampleInputEmail1"
                        />
                        <button
                          className="btn btn-dark"
                          type="button"
                          id="button-addon2"
                        >
                          Search
                        </button>
                      </div>
                    </div> */}
                    <div className="members_list" >

                      <ul className="list-unstyled list-group list-group-custom list-group-flush mb-0">
                        <li className="list-group-item py-3 text-center text-md-start" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                          {taskStatus.map((status) => {
                            const getFormattedDate = (date) => {
                              const newDate = new Date(date);
                              const day = newDate.getDate();
                              const month = newDate.getMonth() + 1;
                              const year = newDate.getFullYear();
                              let hours = newDate.getHours();
                              const minutes = newDate.getMinutes();

                              const meridiem = hours >= 12 ? "PM" : "AM";
                              hours = hours % 12 || 12;

                              return `${day}/${month}/${year} ${hours}:${minutes} ${meridiem}`;
                            };

                            return (
                              <div
                                key={status._id}
                                className="d-flex align-items-center flex-column flex-sm-column flex-md-column flex-lg-row"
                              >
                                <div className="no-thumbnail mb-2 mb-md-0">
                                  <img
                                    className="avatar md rounded-circle"
                                    src={
                                      `${import.meta.env.VITE_BASE_URL}` +
                                      status.user_id.employeeImage
                                    }
                                    alt=""
                                  />
                                  <p
                                    className="fw-bold text-uppercase"
                                    style={{ width: "6rem" }}
                                  >
                                    {status.user_id.employeeName}
                                  </p>
                                </div>
                                <div className="flex-fill ms-3 text-truncate">
                                  <p className="mb-0  fw-bold">
                                    {status.currentStatus}
                                  </p>
                                  <span className="text-muted">
                                    {getFormattedDate(status.createdAt)}
                                  </span>
                                </div>
                                <div className="members-action">
                                  {/* <div className="btn-group">
                                    <div className="btn-group">
                                      <button
                                        type=""
                                        className="btn outline-secondary icofont-ui-delete text-danger "
                                        data-bs-toggle="modal"
                                        data-bs-target="#deleteproject"
                                        onClick={() => {
                                          setProjectId(status._id);
                                        }}
                                      ></button>
                                    </div>
                                  </div> */}
                                </div>
                              </div>
                            );
                          })}
                        </li>
                      </ul>

                      <form onSubmit={handleSubmit}>
                        <div className="row g-3 mb-3">
                          <div className="col">
                            <label className="form-label" hidden>
                              Employee Name
                            </label>
                            <select
                              className="form-select"
                              aria-label="Default select Project Category"
                              id="user_id"
                              value={user_id}
                              onChange={(e) => setUser_id(e.target.value)}
                              hidden
                            >
                              {selectTask.taskAssignPerson?.map((item) => {
                                return (
                                  <option key={item}>
                                    {item.employeeName}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </div>
                        <div className="container">
                          <div className="row">
                            <div className="col-12">
                              <label htmlFor="currentStatus" className="fw-bold fs-5">
                                Add Status
                              </label>
                              <textarea
                                rows=""
                                cols="50"
                                type="text"
                                id="currentStatus"
                                value={currentStatus}
                                onChange={(e) =>
                                  setCurrentStatus(e.target.value)
                                }
                                className="form-control"
                              />
                            </div>
                          </div>
                          <div className="row mt-3">
                            <div className="col-12 d-flex justify-content-end">
                              <button type="submit" className="btn btn-dark">
                                Submit
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
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

export default Tasks;

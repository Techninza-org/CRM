import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { MultiSelect } from "react-multi-select-component";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Loading.css";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  //CREATE TASK

  const User = JSON.parse(localStorage.getItem('user'));

  const [formData, setFormData] = useState({
    assignedBy: User.username || "",
    projectName: "",
    taskEndDate: "",
    taskAssignPerson: "",
    taskPriority: "",
    taskImages: null,
    description: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();

      if (formData.taskImages) {
        for (let i = 0; i < formData.taskImages.length; i++) {
          formDataToSend.append("taskImages", formData.taskImages[i]);
        }
      }

      for (let key in formData) {
        if (key !== "taskImages") {
          formDataToSend.append(key, formData[key]);
        }
      }

      // Append multiple assignees if selected
      selectedEmployees.forEach((employee) => {
        formDataToSend.append("taskAssignPerson", employee.value);
      });

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}api/tasks`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const newTask = response.data;
      setTasks((prevTasks) => [newTask, ...prevTasks]);

      // Clear the form data after successful submission
      setFormData({
        assignedBy: User.username || "",
        projectName: "",
        taskEndDate: "",
        taskAssignPerson: "",
        taskPriority: "",
        taskImages: null,
        description: "",
      });

      // Close the modal programmatically
      const modalElement = document.getElementById("createtask");
      const modal = new bootstrap.Modal(modalElement);
      modal.hide();

      toast.success("Task Created Successfully!", {
        style: {
          backgroundColor: "#4c3575",
          color: "white",
        },
      });

      // Reload the page after 5 seconds
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //Fetch Task
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [taskFormData, setTaskFormData] = useState({
    projectName: "",
    taskEndDate: "",
    taskAssignPerson: "",
    taskPriority: "",
    description: "",
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Formats date to 'YYYY-MM-DD'
  };

  const [taskStatuses, setTaskStatuses] = useState({});
  const [activeTab, setActiveTab] = useState('All'); // State for active tab filter
  const [filterDate, setFilterDate] = useState(''); // Date for date filter
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const tasksPerPage = 10; // Number of tasks per page

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}api/tasks`);
        const formattedTasks = response.data.map(task => ({
          ...task,
          taskEndDate: formatDate(task.taskEndDate),
          taskDate: formatDate(task.taskDate),
        }));
        setTasks(formattedTasks);
        // console.log(response.data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    // Initialize taskStatuses with existing task statuses
    const statuses = {};
    tasks.forEach(task => {
      statuses[task._id] = task.taskStatus;
    });
    setTaskStatuses(statuses);
  }, [tasks]);

  const taskHandleChange = (e, taskId) => {
    const { name, value, files } = e.target;
    setTasks((prevState) =>
      prevState.map((task) =>
        task._id === taskId
          ? { ...task, [name]: files ? files[0] : value }
          : task
      )
    );
  };

  const taskHandleSubmit = async (taskId) => {
    try {
      const taskToUpdate = tasks.find((task) => task._id === taskId);
      const formDataToSend = new FormData();
      delete taskToUpdate.taskAssignPerson;
      for (const key in taskToUpdate) {
        formDataToSend.append(key, taskToUpdate[key]);
      }
      selectedEmployees.forEach((obj) => {
        formDataToSend.append("taskAssignPerson", obj.value);
      });
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}api/tasks/${taskId}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const updatedTask = response.data;
      console.log(updatedTask);
      setTasks((prevState) =>
        prevState.map((task) => (task._id === taskId ? updatedTask : task))
      );
      toast.success("Task Updated Successfully!", {
        style: {
          backgroundColor: "#4c3575",
          color: "white",
        },
      });
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Filter tasks based on activeTab state and filterDate
  const filteredTasks = tasks.filter(task => {
    const taskDate = new Date(task.taskDate);
    const selectedDate = new Date(filterDate);
    const isSameDate = filterDate === '' || taskDate.toISOString().split('T')[0] === selectedDate.toISOString().split('T')[0];

    if (activeTab === 'All') {
      return isSameDate; // Show all tasks for the selected date
    } else if (activeTab === 'Not Started') {
      return task.taskStatus === 'Not Started' && isSameDate; // Filter tasks by Not Started status for the selected date
    } else {
      return task.taskStatus === activeTab && isSameDate; // Filter tasks by other statuses for the selected date
    }
  });

  // Pagination logic
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Next page
  const nextPage = () => setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(filteredTasks.length / tasksPerPage)));

  // Previous page
  const prevPage = () => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));


  //DELETE TASK
  const [deletableId, setDeletableId] = useState("");
  const handleDeleteProject = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}api/tasks/${deletableId}`
      );

      // Filter out the deleted task
      const remainingTasks = tasks.filter((task) => task._id !== deletableId);
      setTasks(remainingTasks);

      // Hide the modal
      const modalElement = document.getElementById("dremovetask");
      const modal = window.bootstrap.Modal.getInstance(modalElement);
      modal.hide();

      // Display toast notification
      toast.error("Task Deleted Successfully!", {
        style: {
          backgroundColor: "#4c3575",
          color: "white",
        },
      });

      // Reload the page after 5 seconds
      setTimeout(() => {
        window.location.reload();
      }, 5000);

    } catch (error) {
      console.error("Error:", error);
    }
  };
  // GET SINGLE TASK
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = async (searchQuery) => {
    if (searchQuery !== "") {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}api/pros/search?id=${searchQuery}`
        );
        setTasks(response.data);
      } catch (error) {
        console.error("Error:", error);
        setTasks(null);
      }
    } else {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_BASE_URL}api/tasks`);
          setTasks(response.data);
        } catch (error) {
          console.error("Error:", error);
        }
      };

      fetchData();
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


  // GET ALL PROJECTS IN INPUT
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}api/projects`);
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const ccc = projects.filter((pro) => {
    return pro.projectName === formData.projectName;
  })[0];
  // console.log(ccc);
  const assignEmployee =
    ccc?.taskAssignPerson?.map((per) => {
      return {
        label: per.employeeName,
        value: per._id,
      };
    }) || [];
  // console.log(assignEmployee, 23423);

  const [showFullDescription, setShowFullDescription] = useState("");
  const [currProj, setCurrProj] = useState({});


  // //CHAT Task
  // const [chatMessages, setChatMessages] = useState([]);
  // const [newMessage, setNewMessage] = useState("");
  // const [selectedTaskId, setSelectedTaskId] = useState(null);

  // const handleChatModalOpen = async (taskId) => {
  //   setSelectedTaskId(taskId);
  //   try {
  //     const response = await axios.get(
  //       `${import.meta.env.VITE_BASE_URL}api/tasks/${taskId}/chat`
  //     );
  //     setChatMessages(response.data);
  //   } catch (error) {
  //     console.error("Error fetching chat messages:", error);
  //   }
  // };

  // const handleSendMessage = async () => {
  //   if (!newMessage) return;
  //   try {
  //     const response = await axios.post(
  //       `${import.meta.env.VITE_BASE_URL}api/tasks/${selectedTaskId}/chat`,
  //       {
  //         message: newMessage,
  //       }
  //     );
  //     setChatMessages([...chatMessages, response.data]);
  //     setNewMessage("");
  //   } catch (error) {
  //     console.error("Error sending message:", error);
  //   }
  // };

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
                          className="btn btn-dark btn-set-task w-sm-100 me-2"
                          data-bs-toggle="modal"
                          data-bs-target="#createtask"
                        >
                          <i className="icofont-plus-circle me-2 fs-6" />
                          Create Task
                        </button>


                        <ul className="nav nav-tabs tab-body-header rounded ms-1 prtab-set w-sm-100" role="tablist">
                          <li className="nav-item">
                            <a
                              className={`nav-link ${activeTab === 'All' ? 'active' : ''}`}
                              onClick={() => setActiveTab('All')}
                              data-bs-toggle="tab"
                              href="#All-list"
                              role="tab"
                            >
                              All
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className={`nav-link ${activeTab === 'Not Started' ? 'active' : ''}`}
                              onClick={() => setActiveTab('Not Started')}
                              data-bs-toggle="tab"
                              href="#NotStarted-list"
                              role="tab"
                            >
                              Not Started
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className={`nav-link ${activeTab === 'In Progress' ? 'active' : ''}`}
                              onClick={() => setActiveTab('In Progress')}
                              data-bs-toggle="tab"
                              href="#Started-list"
                              role="tab"
                            >
                              In Progress
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className={`nav-link ${activeTab === 'Completed' ? 'active' : ''}`}
                              onClick={() => setActiveTab('Completed')}
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
                <div className="d-flex justify-content-between">
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
                  <div className="d-flex text-end mb-3" >
                    <p className="mt-3 fw-bold">Filter by Date:</p>

                    <input
                      className="form-control"
                      type="date"
                      value={filterDate}
                      onChange={(e) => setFilterDate(e.target.value)}
                      style={{ width: '10rem' }}
                    /></div>
                </div>

                {/* Row end  */}

                <div className="modal-body">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th scope="col" style={{ width: '7.5rem' }}>Project name</th>
                        <th scope="col">Task name</th>
                        <th scope="col" style={{ width: '9rem' }}>Assignee</th>
                        <th scope="col" style={{ width: '' }}>Due Date</th>
                        <th scope="col" style={{ width: '9rem' }}>Priority</th>
                        <th scope="col" style={{ width: '' }}>U/D</th>
                        <th scope="col" style={{ width: '' }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <div className="custom-loader"></div>
                      ) : (
                        currentTasks.map((task) => (
                          <tr key={task._id}>
                            <td>{task.projectName}<p>{task.taskDate}</p></td>
                            <td>
                              <input
                                className="w-100 form-control"
                                type="text"
                                placeholder="Explain The Task What To Do & How To Do"
                                name="description"
                                value={task.description}
                                onChange={(e) => taskHandleChange(e, task._id)}
                                style={{ outline: 'none', border: 'none', textWrap: 'wrap' }}
                              />
                            </td>
                            <td>{task.taskAssignPerson.employeeName}<p className="text-muted">By:-{task.assignedBy}</p></td>
                            <td>
                              <input
                                type="date"
                                className="form-control"
                                name="taskEndDate"
                                value={task.taskEndDate}
                                onChange={(e) => taskHandleChange(e, task._id)}
                              />
                            </td>
                            <td>
                              <select
                                className="form-select"
                                aria-label="Default select Priority"
                                name="taskPriority"
                                value={task.taskPriority}
                                onChange={(e) => taskHandleChange(e, task._id)}
                              >
                                <option value="">Set Priority</option>
                                <option value="Highest">Highest</option>
                                <option value="Medium">Medium</option>
                                <option value="Lowest">Lowest</option>
                              </select>
                            </td>
                            <td style={{ display: 'flex', justifyContent: 'center', gap: '2vh', marginTop: '1.1rem' }}>
                              <button
                                onClick={() => taskHandleSubmit(task._id)}
                                className="bi bi-check2 bg-primary text-white border-0 rounded"
                              >
                                {/* Add icon or text for task completion */}
                              </button>
                              <button
                                data-bs-toggle="modal"
                                data-bs-target="#dremovetask"
                                onClick={() => setDeletableId(task._id)}
                                className="bi bi-trash bg-danger text-white border-0 rounded"
                              >
                                {/* Add icon or text for task deletion */}
                              </button>
                            </td>
                            <td>
                              {task.taskStatus === 'Not Started' && (
                                <span className="badge bg-warning text-dark">Not Started</span>
                              )}
                              {task.taskStatus === 'In Progress' && (
                                <span className="badge bg-info text-dark">In Progress</span>
                              )}
                              {task.taskStatus === 'Completed' && (
                                <span className="badge bg-success">Completed</span>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                  <nav className="d-flex justify-content-center">
                    <ul className="pagination">
                      <li className="page-item">
                        <button onClick={prevPage} className="page-link" disabled={currentPage === 1}>
                          &laquo;
                        </button>
                      </li>
                      {Array.from({ length: Math.ceil(filteredTasks.length / tasksPerPage) }, (_, i) => (
                        <li key={i + 1} className="page-item">
                          <button onClick={() => paginate(i + 1)} className="page-link">
                            {i + 1}
                          </button>
                        </li>
                      ))}
                      <li className="page-item">
                        <button onClick={nextPage} className="page-link" disabled={currentPage === Math.ceil(filteredTasks.length / tasksPerPage)}>
                          &raquo;
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>




                {/* <div className="row">
                    {tasks.map((task) => {
                      const getFormattedDate = (date) => {
                        const newDate = new Date(date);
                        const day = newDate.getDate();
                        const month = newDate.getMonth() + 1;
                        const year = newDate.getFullYear();

                        return `${day}/${month}/${year}`;
                      };

                      return (
                        <>
                          <div className="col-md-4 mb-4"
                            data-bs-toggle="modal"
                            data-bs-target="#viewtask"
                            onClick={() => setCurrProj(task)}
                            key={task._id} >
                            <div className="card" style={{ width: "18rem" }}>
                              <div className="card-body dd-handle">
                                <div className="d-flex justify-content-between">
                                  <h6 className="fw-bold py-3 mb-0">
                                    {task.projectName}
                                  </h6>
                                  {task.isCompleted && (
                                    <i className="bi bi-check-circle-fill text-success h5" />
                                  )}
                                </div>
                                <div className="task-info d-flex align-items-center justify-content-between">
                                  <h6 className="light-success-bg py-1 px-1 rounded-1 d-inline-block fw-bold small-14 mb-0">
                                    {task.taskCategory}
                                  </h6>
                                  <div className="task-priority d-flex flex-column align-items-center justify-content-center">
                                    <div>
                                      <div className="avatar-list avatar-list-stacked m-0 d-flex justify-content-center">
                                        <img
                                          className="avatar rounded-circle small-avt"
                                          src={
                                            `${import.meta.env.VITE_BASE_URL}` +
                                            task.taskAssignPerson?.employeeImage
                                          }
                                          alt=""
                                        />
                                      </div>

                                      <p>{task.taskAssignPerson?.employeeName}</p>
                                    </div>
                                    <span className="badge bg-danger text-end mt-2">
                                      {task.taskPriority}
                                    </span>
                                  </div>
                                </div>
                                <p
                                  className="py-2 mb-0 task-description"
                                  style={{
                                    maxHeight: showFullDescription
                                      ? "none"
                                      : "11em",
                                    overflowY: "auto",
                                  }}
                                >
                                  {task?.description}
                                </p>
                                <div className="tikit-info row g-3 align-items-center">
                                  <div className="col-sm ">
                                    <ul className="d-flex list-unstyled align-items-center justify-content-between mt-1 mb-1">
                                      <li className="me-2">
                                        <div className="d-flex align-items-center fw-bold">
                                          Start:
                                          <span className="ms-1">
                                            {getFormattedDate(task.taskStartDate)}
                                          </span>
                                        </div>
                                      </li>
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
                                    <div
                                      className="btn-group"
                                      role="group"
                                      aria-label="Basic outlined example"
                                    >
                                      <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        data-bs-toggle="modal"
                                        data-bs-target="#editemp"
                                        onClick={() => setToEdit(task._id)}
                                      >
                                        <i className="icofont-edit text-success" />
                                      </button>
                                      <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        data-bs-toggle="modal"
                                        data-bs-target="#dremovetask"
                                        onClick={() => {
                                          setDeletableId(task._id);
                                        }}
                                      >
                                        <i className="icofont-ui-delete text-danger" />
                                      </button>
                                    </div>

                                    <div
                                      className="btn-group"
                                      role="group"
                                      aria-label="Basic outlined example"
                                    >
                                      
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


                          
                        </>
                        
                      );
                    })}
                  </div> */}

              </div>
            </div>
            <>
              {/* Create task */}
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
                          placeholder="Add Category"
                          aria-label="Default select Project Category"
                          name="projectName"
                          value={formData.projectName}
                          onChange={handleChange}
                        >
                          <option>Chosse Project</option>
                          {projects.map((project) => (
                            <option
                              key={project.id}
                              value={project.projectName}
                            >
                              {project.projectName}
                            </option>
                          ))}
                        </select>
                      </div>
                      {/* <div className="mb-3">
                        <label className="form-label">Task Category</label>
                        <select
                          className="form-select"
                          placeholder="Add Category"
                          aria-label="Default select Project Category"
                          name="taskCategory"
                          value={formData.taskCategory}
                          onChange={handleChange}
                        >
                          <option selected="Add Category">Add Category</option>
                          <option value={"UI/UX Design"}>UI/UX Design</option>
                          <option value={"Website Developement"}>
                            Website Developement
                          </option>
                          <option value={"App Development"}>
                            App Development
                          </option>
                          <option value={"Digital Marketing"}>
                            Digital Marketing
                          </option>
                        </select>
                      </div> */}
                      {/* <div className="mb-3">
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
                          multiple
                          name="taskImages"
                          onChange={handleFileChange}
                        />
                      </div> */}
                      <div className="deadline-form mb-3">
                        <form>
                          <div className="row">
                            {/* <div className="col">
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
                                name="taskStartDate"
                                value={formData.taskStartDate}
                                onChange={handleChange}
                              />
                            </div> */}
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
                                name="taskEndDate"
                                value={formData.taskEndDate}
                                onChange={handleChange}
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
                          <div>
                            <MultiSelect
                              options={assignEmployee}
                              value={selectedEmployees}
                              onChange={setSelectedEmployees}
                              labelledBy="Select Employees"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row g-3 mb-3">
                        <div className="col-sm">
                          <label className="form-label">Task Priority</label>
                          <select
                            className="form-select"
                            aria-label="Default select Priority"
                            name="taskPriority"
                            value={formData.taskPriority}
                            onChange={handleChange}
                          >
                            <option placeholder="set priority">
                              Set Priority
                            </option>
                            <option value={"Heighest"}>Highest</option>
                            <option value={"Medium"}>Medium</option>
                            <option value={"Lowest"}>Lowest</option>
                          </select>
                        </div>
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlTextarea786"
                          className="form-label"
                        >
                          Task Name
                        </label>
                        <textarea
                          className="form-control"
                          id="exampleFormControlTextarea786"
                          rows={3}
                          placeholder="Explain The Task What To Do & How To Do"
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
                        data-bs-dismiss="modal"
                        onClick={handleSubmit}
                      >
                        Create
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal  Delete Task */}
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
                        onClick={handleDeleteProject}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Update task */}
              <div
                className="modal fade"
                id="editemp"
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
                        Update Task
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
                        {/* <input
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput77"
                          placeholder="Project Name"
                          name="projectName"
                          value={formData.projectName}
                          onChange={handleChange}
                        /> */}
                        <select
                          className="form-select"
                          placeholder="Add Category"
                          aria-label="Default select Project Category"
                          name="projectName"
                          value={taskFormData.projectName}
                          onChange={taskHandleChange}
                        >
                          <option>Chosse Project</option>
                          {projects.map((project) => (
                            <option
                              key={project.id}
                              value={project.projectName}
                            >
                              {project.projectName}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Task Category</label>
                        <select
                          className="form-select"
                          placeholder="Add Category"
                          aria-label="Default select Project Category"
                          name="taskCategory"
                          value={taskFormData.taskCategory}
                          onChange={taskHandleChange}
                        >
                          <option selected="Add Category">Add Category</option>
                          <option value={"UI/UX Design"}>UI/UX Design</option>
                          <option value={"Website Developement"}>
                            Website Developement
                          </option>
                          <option value={"App Development"}>
                            App Development
                          </option>
                          {/* <option value={"Quality Assurance"}>
                          Quality Assurance
                        </option>
                        <option value={"Development"}>Development</option>
                        <option value={"Backend Development"}>
                          Backend Development
                        </option>
                        <option value={"Software Testing"}>
                          Software Testing
                        </option>
                        <option value={"Website Design"}>Website Design</option> */}
                          <option value={"Digital Marketing"}>
                            Digital Marketing
                          </option>
                          {/* <option value={"SEO"}>SEO</option> */}
                          {/* <option value={"Other"}>Other</option> */}
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
                          name="taskImages"
                          onChange={taskHandleChange}
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
                                name="taskStartDate"
                                value={taskFormData.taskStartDate}
                                onChange={taskHandleChange}
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
                                name="taskEndDate"
                                value={taskFormData.taskEndDate}
                                onChange={taskHandleChange}
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
                          <div>
                            <MultiSelect
                              options={assignEmployee}
                              value={selectedEmployees}
                              onChange={setSelectedEmployees}
                              labelledBy="Select Employees"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row g-3 mb-3">
                        <div className="col-sm">
                          <label className="form-label">Task Priority</label>
                          <select
                            className="form-select"
                            aria-label="Default select Priority"
                            name="taskPriority"
                            value={taskFormData.taskPriority}
                            onChange={taskHandleChange}
                          >
                            <option placeholder="set priority">
                              Set Priority
                            </option>
                            <option value={"Heighest"}>Heighest</option>
                            <option value={"Medium"}>Medium</option>
                            <option value={"Lowest"}>Lowest</option>
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
                          placeholder="Explain The Task What To Do & How To Do"
                          name="description"
                          value={taskFormData.description}
                          onChange={taskHandleChange}
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
                        onClick={taskHandleSubmit}
                      >
                        Create
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          </>
        </div>
        <ToastContainer />
      </div >
    </>
  );
};

export default Tasks;
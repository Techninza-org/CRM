import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Loading.css";
import { useNavigate } from "react-router-dom";

const MembersReport = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false); // Added loading state
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    employeeName: "",
    employeeCompany: "",
    employeeImage: null,
    employeeId: "",
    joiningDate: "",
    // username: "",
    password: "",
    emailid: "",
    phone: "+91 ",
    department: "",
    designation: "",
    description: "",
  });

  //   GET EMPLOYEES
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}api/employees`
        );

        let lastOldId = 1;
        response.data.forEach((d) => {
          const newId = parseInt(d.employeeId.slice(2), 10);
          if (!Number.isNaN(newId) && newId > lastOldId) {
            lastOldId = newId;
          }
        });

        const newId = `TN00${lastOldId + 1}`;
        setFormData((prevFormData) => ({
          ...prevFormData,
          employeeId: newId,
        }));
        setEmployees(response.data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fetch tasks summary
  useEffect(() => {
    const fetchTasksSummary = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}api/tasks-summary`);
        setEmployees(response.data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasksSummary();
  }, []);

  // Search employee
  const handleSearch = async (searchQuery) => {
    if (searchQuery !== "") {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}api/search?id=${searchQuery}`);
        setEmployees(response.data);
      } catch (error) {
        console.error("Error:", error);
        setEmployees(null);
      }
    } else {
      const fetchTasksSummary = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_BASE_URL}api/tasks-summary`);
          setEmployees(response.data);
        } catch (error) {
          console.error("Error:", error);
        }
      };

      fetchTasksSummary();
    }
  };


  // Calculate performance percentage
  const calculatePerformance = (totalTasks, completedTasks) => {
    if (totalTasks > 0) {
      return ((completedTasks / totalTasks) * 100).toFixed(2); // Rounds to 2 decimal places
    }
    return '0.00'; // No tasks available
  };

  return (
    <>
      <div id="mytask-layout">
        <Sidebar />
        <div className="main px-lg-4 px-md-4">
          <Header />
          <div className="body d-flex py-lg-3 py-md-2">
            <div className="container-xxl">
              <div className="row clearfix">
                <div className="col-md-12">
                  <div className="card border-0 mb-4 no-bg">
                    <div className="card-header py-3 px-0 d-sm-flex align-items-center justify-content-between border-bottom">
                      <h3 className="fw-bold flex-fill mb-0 mt-sm-0">Employees Report</h3>
                    </div>
                    <div className="card-body">
                      {loading ? (
                        <div>Loading...</div>
                      ) : (
                        <table className="table table-striped">
                          <thead>
                            <tr>
                              <th className="text-center">Company ID</th>
                              <th className="text-center">Name</th>
                              <th className="text-center">Total Task</th>
                              <th className="text-center">Completed Task</th>
                              <th className="text-center">Remaining Task</th>
                              <th className="text-center">Performance</th>
                            </tr>
                          </thead>
                          <tbody>
                            {employees.length > 0 ? (
                              employees.map((employee) => (
                                <tr key={employee.employeeId}>
                                  <td className="text-center">{employee.employeeId}</td>
                                  <td className="text-center">{employee.employeeName}</td>
                                  <td className="text-center">{employee.totalTasks}</td>
                                  <td className="text-center">{employee.completedTasks}</td>
                                  <td className="text-center">{employee.remainingTasks}</td>
                                  <td className="text-center">{calculatePerformance(employee.totalTasks, employee.completedTasks)}%</td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="6">No employees found.</td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {/* Row End */}
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default MembersReport;

import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProjectDashboard = () => {

  return (
    <>
      <div id="mytask-layout">
        <Sidebar />
        {/* main body area */}
        <div className="main px-lg-4 px-md-4">
          {/* Body: Header */}
          <Header />
          <div className="body d-flex py-lg-3 py-md-2">
            <div className="container-xxl">
              <div className="col-12">
                <div className="card mb-3">
                  <div className="card-body text-center p-5">
                    <img
                      src="../assets/images/no-data.svg"
                      className="img-fluid mx-size"
                      alt="No Data"
                    />
                    <div className="mt-4 mb-2">
                      <Link to="https://techninza.in/" className="text-muted">
                        GO TO THE WEBSITE
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
              <ToastContainer />
      </div>
    </>
  );
};

export default ProjectDashboard;

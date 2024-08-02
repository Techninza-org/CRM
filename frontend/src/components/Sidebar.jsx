import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {


  return (
    <div className="sidebar px-4 py-4 py-md-5 me-0">
      <div className="d-flex flex-column h-100">
        <div className="mb-0 brand-icon">
          <span className="logo-icon">
            <img src='../Images/techninza-logo1.png' style={{ height: "4rem" }} alt="Techninza Logo" />
          </span>
          <div>
            <span className="logo-text fs-4">TECHNINZA</span>
            <span className="logo-text" style={{ fontSize: "10px" }}>TECHNOLOGY NINJAS</span>
          </div>
        </div>
        {/* Menu: main ul */}
        <ul className="menu-list flex-grow-1 mt-3">
          <li className="collapsed">
            <a
              className="m-link"
              data-bs-toggle="collapse"
              data-bs-target="#dashboard-Components"
              href="#"
            >
              <i className="icofont-home fs-5" /> <span>Dashboard</span>{" "}
              <span className="arrow icofont-dotted-down ms-auto text-end fs-5" />
            </a>
            {/* Menu: Sub menu ul */}
            <ul className="sub-menu collapse show" id="dashboard-Components">
              <li>
                <Link className="ms-link" to="/project-dashboard">
                  <span>Admin Dashboard</span>
                </Link>
              </li>
            </ul>
          </li>
          <li className="collapsed">
            <a
              className="m-link"
              data-bs-toggle="collapse"
              data-bs-target="#project-Components"
              href="#"
            >
              <i className="icofont-briefcase" />
              <span>Projects</span>{" "}
              <span className="arrow icofont-dotted-down ms-auto text-end fs-5" />
            </a>
            {/* Menu: Sub menu ul */}
            <ul className="sub-menu collapse" id="project-Components">
              <li>
                <Link className="ms-link" to="/projects">
                  <span>Projects</span>
                </Link>
              </li>
              <li>
                <Link className="ms-link" to="/tasks">
                  <span>Tasks</span>
                </Link>
              </li>
            </ul>
          </li>
          <li className="collapsed">
            <a
              className="m-link"
              data-bs-toggle="collapse"
              data-bs-target="#client-Components"
              href="#"
            >
              <i className="icofont-user-male" /> <span>Our Clients</span>{" "}
              <span className="arrow icofont-dotted-down ms-auto text-end fs-5" />
            </a>
            <ul className="sub-menu collapse" id="client-Components">
              <li>
                <Link className="ms-link" to="/clients">
                  <span>Clients</span>
                </Link>
              </li>
            </ul>
          </li>
          <li className="collapsed">
            <a
              className="m-link"
              data-bs-toggle="collapse"
              data-bs-target="#emp-Components"
              href="#"
            >
              <i className="icofont-users-alt-5" /> <span>Employees</span>{" "}
              <span className="arrow icofont-dotted-down ms-auto text-end fs-5" />
            </a>
            <ul className="sub-menu collapse" id="emp-Components">
              <li>
                <Link className="ms-link" to="/members">
                  <span>Members</span>
                </Link>
              </li>
              <li>
                <Link className="ms-link" to="/members-report">
                  <span>Members Report</span>
                </Link>
              </li>
            </ul>
          </li>
          <li className="collapsed">
            <a
              className="m-link"
              data-bs-toggle="collapse"
              data-bs-target="#menu-Componentsone"
              href="#"
            >
              <i className="icofont-ui-calculator" /> <span>Accounts</span>{" "}
              <span className="arrow icofont-dotted-down ms-auto text-end fs-5" />
            </a>
            <ul className="sub-menu collapse" id="menu-Componentsone">
              <li>
                <Link className="ms-link" to="/create-invoice">
                  <span>Create Invoice</span>{" "}
                </Link>
              </li>
              <li>
                <Link className="ms-link" to="/all-invoice">
                  <span>All Invoice</span>{" "}
                </Link>
              </li>
            </ul>
          </li>
          <li className="collapsed">
            <a
              className="m-link"
              data-bs-toggle="collapse"
              data-bs-target="#crmcontroller-Components"
              href="#"
            >
              <i className="icofont-ui-settings" /> <span>Access Controller</span>{" "}
              <span className="arrow icofont-dotted-down ms-auto text-end fs-5" />
            </a>
            <ul className="sub-menu collapse" id="crmcontroller-Components">
              <li>
                <Link className="ms-link" to="/crm-controller">
                  <span>CRM Controller</span>{" "}
                </Link>
              </li>
            </ul>
          </li>
        </ul>
        <button
          type="button"
          className="btn btn-link sidebar-mini-btn text-light"
        >
          <span className="ms-2">
            <i className="icofont-bubble-right" />
          </span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

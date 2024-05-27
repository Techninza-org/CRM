import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.username || !form.email || !form.password) {
      setError("Please fill out all fields");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}api/signup`,
        form
      );
      console.log(response.data);
      alert("Signup successful!");
      window.location.href = "/";
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred. Please try again later.");
      }
      console.error(error);
    }
  };

  return (
    <>
      <div id="mytask-layout">
        {/* main body area */}
        <div className="main p-2 py-3 p-xl-5">
          {/* Body: Body */}
          <div className="body d-flex p-0 p-xl-5">
            <div className="container-xxl">
              <div className="row g-0">
                <div className="col-lg-6 d-none d-lg-flex justify-content-center align-items-center rounded-lg auth-h100">
                  <div style={{ maxWidth: "25rem" }}>
                    <img
                      src="../Images/techninza-logo.png"
                      className="mb-4"
                      style={{ width: "-webkit-fill-available" }}
                    />
                    <div className="d-flex justify-content-center ">
                      <img
                        src="../Images/crm.jpeg"
                        className="text-center"
                        style={{ height: "30px" }}
                      />
                    </div>
                    {/* Image block */}
                    <div>
                      <img
                        src="../assets/images/login-img.svg"
                        alt="login-img"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 d-flex justify-content-center align-items-center border-0 rounded-lg auth-h100">
                  <div
                    className="w-100 p-3 p-md-5 card border-0 bg-dark text-light"
                    style={{ maxWidth: "32rem" }}
                  >
                    {/* Form */}
                    <form
                      onSubmit={handleSubmit}
                      className="row g-1 p-3 p-md-4"
                    >
                      <div className="col-12 text-center mb-1 mb-lg-5">
                        <h1>Admin Sign up</h1>
                        <span>Create your account as a Admin</span>
                      </div>
                      <div className="col-12 text-center ">
                        <Link
                          className="btn btn-lg btn-outline-secondary btn-block"style={{marginTop: "-40px"}}
                          to="/employeesignup"
                        >
                          <span className="d-flex justify-content-center align-items-center gap-2">
                          <i class="bi bi-person-plus-fill"></i>
                            Sign up as a Employee
                          </span>
                        </Link>
                        <span className="dividers text-muted mt-4">OR</span>
                      </div>
                      <div className="col-12">
                        <div className="mb-2">
                          <label className="form-label">Full name</label>
                          <input
                            type="text"
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            className="form-control form-control-lg"
                            placeholder="John"
                          />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="mb-2">
                          <label className="form-label">Email address</label>
                          <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="form-control form-control-lg"
                            placeholder="name@example.com"
                          />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="mb-2">
                          <label className="form-label">Password</label>
                          <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            className="form-control form-control-lg"
                            placeholder="8+ characters required"
                          />
                        </div>
                      </div>
                      <div className="col-12 text-center mt-4">
                        <button
                          type="submit"
                          className="btn btn-lg btn-block btn-light lift text-uppercase"
                          alt="SIGNUP"
                        >
                          SIGN UP
                        </button>
                      </div>
                      {error && <p>{error}</p>}
                    </form>
                    <div className="col-12 text-center mt-4">
                      <span className="text-muted">
                        Already have an account?{" "}
                        <Link to="/" title="Sign in" className="text-secondary">
                          Sign in here
                        </Link>
                      </span>
                    </div>
                    {/* End Form */}
                  </div>
                </div>
              </div>{" "}
              {/* End Row */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;

import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { creatUser } from '../AuthSlice';

function SignUp() {
  const user = useSelector((state) => state.Auth.loggedInUser);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(
      creatUser({
        name: data.name,
        email: data.email,
        password: data.password,
        address: [],
        role: 'user',
      })
    );

    // Reset the form fields after submission
    reset();
  };

  const password = watch('password');

  return (
    <>
      {user && <Navigate to="/" replace={true}></Navigate>}
      <div
        className="container-fluid d-flex justify-content-center align-items-center auth-background"
        style={{ minHeight: '100vh', padding: '20px', overflowY: 'auto' }}
      >
        <div className="row w-100 d-flex justify-content-center align-items-center">
          {/* Left Side Content */}
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <div className="text-white text-center">
              <h1 className="text-dark text-bold">
                Welcome to <span className="text-primary">Nothing Mart</span>
              </h1>
              <h5 className="text-dark">
                Create an account to access exclusive content and features.
              </h5>
            </div>
          </div>
          {/* Right Side Form */}
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <div
              className="card w-100"
              style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
            >
              <div className="card-header text-center text-white">
                <h3>Sign Up</h3>
                <div className="d-flex justify-content-center">
                  <span className="mx-2">
                    <i
                      className="fab fa-facebook-square text-warning"
                      style={{ fontSize: '30px' }}
                    />
                  </span>
                  <span className="mx-2">
                    <i
                      className="fab fa-google-plus-square text-warning"
                      style={{ fontSize: '30px' }}
                    />
                  </span>
                  <span className="mx-2">
                    <i
                      className="fab fa-twitter-square text-warning"
                      style={{ fontSize: '30px' }}
                    />
                  </span>
                </div>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* Name */}
                  <div className="input-group form-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text bg-warning text-dark">
                        <i className="fas fa-user" />
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Full Name"
                      {...register('name', {
                        required: 'Name is required',
                      })}
                    />
                    {errors.name && (
                      <p className="m-0 text-danger">{errors.name.message}</p>
                    )}
                  </div>
                  {/* Email */}
                  <div className="input-group form-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text bg-warning text-dark">
                        <i className="fas fa-envelope" />
                      </span>
                    </div>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value:
                            /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                          message: 'Email is not valid',
                        },
                      })}
                    />
                    {errors.email && (
                      <p className="m-0 text-danger">{errors.email.message}</p>
                    )}
                  </div>
                  {/* Password */}
                  <div className="input-group form-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text bg-warning text-dark">
                        <i className="fas fa-key" />
                      </span>
                    </div>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      {...register('password', {
                        required: 'Password is required',
                        pattern: {
                          value:
                            /^(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/,
                          message:
                            'Password should be at least one capital letter, one small letter, one number and 8 characters long',
                        },
                      })}
                    />
                    {errors.password && (
                      <p className="m-0 text-danger">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                  {/* Confirm Password */}
                  <div className="input-group form-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text bg-warning text-dark">
                        <i className="fas fa-key" />
                      </span>
                    </div>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Confirm Password"
                      {...register('confirm_password', {
                        required: 'Password confirmation is required',
                        validate: (value) =>
                          value === password || 'Passwords do not match',
                      })}
                    />
                    {errors.confirm_password && (
                      <p className="m-0 text-danger">
                        {errors.confirm_password.message}
                      </p>
                    )}
                  </div>
                  {/* Submit Button */}
                  <div className="form-group">
                    <button type="submit" className="btn btn-warning btn-block">
                      Sign Up
                    </button>
                  </div>
                </form>
              </div>
              <div className="card-footer text-center">
                <div className="text-white">
                  Already have an account?
                  <Link to="/login" className="text-warning ml-2">
                    Sign In
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;

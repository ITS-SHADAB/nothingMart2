import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'; // Use useNavigate instead of Navigate
import { authenticationUser } from '../AuthSlice';
import { clearError } from '../AuthSlice';
import { useEffect } from 'react';

function Authentication() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const { loggedInUser, errore, loading } = useSelector((state) => state.Auth); // Access loading and error from state
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  function checkUser(data) {
    dispatch(
      authenticationUser({ email: data.email, password: data.password })
    );
    reset(); // Optionally reset the form
  }
  // Handle navigation after successful login based on user role
  useEffect(() => {
    if (loggedInUser) {
      if (loggedInUser.role === 'admin') {
        navigate('/admin-product'); // Redirect admin users to admin-product page
      } else {
        navigate('/'); // Redirect other users to home
      }
    }
  }, [loggedInUser, navigate]); // Dependency on loggedInUser to trigger navigation after login

  useEffect(() => {
    dispatch(clearError()); // Clear error on component mount
  }, [dispatch]);

  return (
    <>
      <div className="container-fluid d-flex justify-content-center align-items-center auth-background">
        <div className="row w-100 d-flex justify-content-center align-items-center">
          {/* Left Side Content */}
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <div className="text-white text-center">
              <h1 className="text-dark text-bold">
                Welcome to <span className="text-primary">Nothing Mart</span>
              </h1>
              <h5 className="text-dark">
                Sign in to access exclusive content and features.
              </h5>
            </div>
          </div>
          {/* Right Side Form */}
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <div
              className="card w-100 h-100"
              style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
            >
              <div className="card-header text-center text-white">
                <h3>Sign In</h3>
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
                <form onSubmit={handleSubmit(checkUser)}>
                  <div className="input-group form-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text bg-warning text-dark">
                        <i className="fas fa-user" />
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="username"
                      id="email"
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
                  <div className="input-group form-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text bg-warning text-dark">
                        <i className="fas fa-key" />
                      </span>
                    </div>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="password"
                      id="password"
                      {...register('password', {
                        required: 'Password is required..',
                      })}
                    />
                  </div>
                  {errors.password && (
                    <p className="m-0 text-danger">{errors.password.message}</p>
                  )}

                  {/* Display authentication error */}
                  {errore && (
                    <div className="alert alert-danger" role="alert">
                      {errore}
                    </div>
                  )}

                  <div className="form-check mb-3">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="rememberMe"
                    />
                    <label
                      className="form-check-label text-white"
                      htmlFor="rememberMe"
                    >
                      Remember Me
                    </label>
                  </div>
                  <div className="form-group">
                    <button
                      type="submit"
                      className="btn btn-warning btn-block"
                      disabled={loading} // Disable button when loading
                    >
                      {loading ? 'Logging in...' : 'Login'}
                    </button>
                  </div>
                </form>
              </div>
              <div className="card-footer text-center">
                <div className="text-white">
                  Don't have an account?
                  <Link to="/signUp" className="text-warning ml-2">
                    Sign Up
                  </Link>
                </div>
                <div>
                  <a href="#" className="text-warning">
                    Forgot your password?
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Authentication;

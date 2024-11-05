import React from 'react';
import Category from './Category';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Navbar() {
  const cart = useSelector((state) => state.cart.arrCart);
  const user = useSelector((state) => state.Auth.loggedInUser);
  return (
    <>
      {/* Navbar Start */}
      <div className="container-fluid bg-dark mb-2 sticky-navbar">
        <div className="row px-xl-5">
          {<Category />}

          <div className="col-lg-9">
            {user?.role === 'admin' ? (
              <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 py-lg-0 px-0">
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarCollapse"
                  aria-controls="navbarCollapse"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                  <div className="navbar-nav py-0">
                    <Link to="/admin-product" className="nav-item nav-link">
                      Product
                    </Link>
                    <Link to="/admin-order" className="nav-item nav-link">
                      Orders
                    </Link>
                  </div>
                  <div className="dropdown ms-auto">
                    <button
                      className="btn dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img
                        src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                        className="rounded-circle"
                        height={25}
                        alt="Avatar"
                        loading="lazy"
                      />
                    </button>
                    <ul
                      className="dropdown-menu dropdown-menu-end"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <li>
                        <Link to="/profile" className="dropdown-item">
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link to="/logout" className="dropdown-item">
                          Sign Out
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
            ) : (
              <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-0 py-lg-0 px-5">
                <a href="#" className="text-decoration-none d-block d-lg-none">
                  <span className="h1 text-uppercase text-dark bg-light px-2">
                    Nothing
                  </span>
                  <span className="h1 text-uppercase text-light bg-primary px-2 ml-n1">
                    Mart
                  </span>
                </a>
                <button
                  type="button"
                  className="navbar-toggler"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarCollapse"
                >
                  <span className="navbar-toggler-icon" />
                </button>
                <div
                  className="collapse navbar-collapse justify-content-between"
                  id="navbarCollapse"
                >
                  <div className="navbar-nav mr-auto py-0">
                    <Link to="/" className="nav-item nav-link">
                      Home
                    </Link>
                    <Link to="/shop" className="nav-item nav-link">
                      Shop
                    </Link>

                    <div className="nav-item dropdown">
                      <a
                        href="#"
                        className="nav-link dropdown-toggle"
                        data-bs-toggle="dropdown"
                      >
                        Pages <i className="fa fa-angle-down mt-1" />
                      </a>
                      <div className="dropdown-menu bg-primary rounded-0 border-0 m-0">
                        <Link to="/cart" className="dropdown-item">
                          Shopping Cart
                        </Link>
                        <Link to="/checkout" className="dropdown-item">
                          Checkout
                        </Link>
                      </div>
                    </div>
                    <Link to="/contact" className="nav-item nav-link ">
                      Contact
                    </Link>
                  </div>

                  <div className="navbar-nav ml-auto py-0 d-none d-lg-block">
                    {!user && (
                      <Link to="/login" className="btn btn-warning ml-3">
                        Login
                      </Link>
                    )}

                    <Link to="/cart" className="btn px-0 ml-3">
                      <i className="fas fa-shopping-cart text-primary" />
                      <span className="badge text-secondary border border-secondary rounded-circle">
                        {cart.length}
                      </span>
                    </Link>
                  </div>
                  <div className="dropdown">
                    <button
                      className="btn dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img
                        src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                        className="rounded-circle"
                        height={25}
                        alt="Avatar"
                        loading="lazy"
                      />
                    </button>
                    <ul
                      className="dropdown-menu dropdown-menu-end"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <li>
                        <Link to="/profile" className="dropdown-item">
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link to={'/order'} className="dropdown-item">
                          My Order
                        </Link>
                      </li>
                      <li>
                        <Link to="/logout" className="dropdown-item">
                          Sign Out
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
            )}
          </div>
        </div>
      </div>
      {/* Navbar End */}
    </>
  );
}

export default Navbar;

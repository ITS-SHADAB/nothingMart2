import React from 'react';
import Search from './Search';

function Topbar() {
  return (
    <>
      {/* Topbar Start */}
      <div className="container-fluid">
        <div className="row align-items-center bg-light py-2 px-xl-5 d-none d-lg-flex">
          <div className="col-lg-4">
            <a href="" className="text-decoration-none">
              <span className="h1 text-uppercase text-primary bg-dark px-2">
                Nothing
              </span>
              <span className="h1 text-uppercase text-dark bg-primary px-2 ml-n1">
                Mart
              </span>
            </a>
          </div>
          {<Search />}
          <div className="col-lg-4 col-6 text-right">
            <p className="m-0">Customer Service</p>
            <h5 className="m-0">+012 345 6789</h5>
          </div>
        </div>
      </div>
      {/* Topbar End */}
    </>
  );
}

export default Topbar;

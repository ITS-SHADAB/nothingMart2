import React from 'react';

function Discount() {
  return (
    <section className="bg-light py-5">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start mb-4 mb-md-0">
            <h3>
              All Branded Men's Suits are Flat{' '}
              <span className="text-primary">30% Discount</span>
            </h3>
            <p>Visit our shop to see amazing creations from our designers.</p>
            <a href="ecommerce.html" className="btn btn-primary">
              Shop Now
            </a>
          </div>
          <div className="col-md-6 text-center">
            <img
              src="/static/img/suit.jpg"
              alt="Men's Suits"
              className="img-fluid"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Discount;

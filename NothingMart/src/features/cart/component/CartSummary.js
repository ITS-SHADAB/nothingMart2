// CartSummary.js
import React from 'react';
import { Link } from 'react-router-dom';
import { getTotalPrice } from '../../../common/common';

function CartSummary({ arrCart }) {
  return (
    <div className="bg-light p-30 mb-5">
      <h5 className="section-title position-relative text-uppercase mb-3">
        <span className="bg-secondary pr-3">Cart Summary</span>
      </h5>
      <div className="border-bottom pb-2">
        <div className="d-flex justify-content-between mb-3">
          <h6>Subtotal</h6>
          <h6>${getTotalPrice(arrCart).toFixed(2)}</h6>
        </div>
        <div className="d-flex justify-content-between">
          <h6 className="font-weight-medium">Shipping</h6>
          <h6 className="font-weight-medium">$10</h6>
        </div>
      </div>
      <div className="pt-2">
        <div className="d-flex justify-content-between mt-2">
          <h5>Total</h5>
          <h5>${(getTotalPrice(arrCart) + 10).toFixed(2)}</h5>
        </div>
        <Link to="/checkOut">
          <button className="btn btn-block btn-primary font-weight-bold my-3 py-3">
            Proceed To Checkout
          </button>
        </Link>
      </div>
    </div>
  );
}

export default CartSummary;

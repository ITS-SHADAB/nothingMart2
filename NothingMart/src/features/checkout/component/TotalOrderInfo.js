import React from 'react';
import { getTotalPrice } from '../../../common/common';

function TotalOrderInfo({ arrCart }) {
  const totalPrice = getTotalPrice(arrCart);
  return (
    <div className="bg-light p-30 mb-5">
      <div className="border-bottom">
        <div className="d-flex justify-content-between">
          <h6 className="mb-3">Products</h6>
          <h6 className="mb-3">Title</h6>
          <h6 className="mb-3">Price</h6>
        </div>

        {arrCart.map(({ product }, index) => (
          <div className="d-flex justify-content-between" key={index}>
            <img
              src={product.thumbnail}
              alt="product-img"
              className="avatar-md rounded m-1"
            />
            <p className="mx-0">{product.title}</p>
            <p>${Math.round(product.price)}</p>
          </div>
        ))}
      </div>
      <div className="border-bottom pt-3 pb-2">
        <div className="d-flex justify-content-between mb-3">
          <h6>Subtotal</h6>
          <h6>${totalPrice.toFixed(2) || 0}</h6>
        </div>
        <div className="d-flex justify-content-between">
          <h6 className="font-weight-medium">Shipping</h6>
          <h6 className="font-weight-medium">$10</h6>
        </div>
      </div>
      <div className="pt-2">
        <div className="d-flex justify-content-between mt-2">
          <h5>Total</h5>
          <h5>${(totalPrice + 10).toFixed(2) || 0}</h5>
        </div>
      </div>
    </div>
  );
}

export default TotalOrderInfo;

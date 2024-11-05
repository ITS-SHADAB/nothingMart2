import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../../cart/CartSlice';

function SingleProduct({ data }) {
  const { title, thumbnail, price, discountPercentage, rating, id } = data;
  const user = useSelector((state) => state.Auth.loggedInUser);

  const dispatch = useDispatch();
  function addItem(data) {
    dispatch(addToCart({ product: id, quantity: 1 }));
  }

  return (
    <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
      <div className="product-item mb-4 rounded-corners bg-brown">
        <Link to={`/shop-detail/${id}`}>
          <div className="product-img position-relative overflow-hidden rounded-corners">
            <img
              className="img-fluid w-100 bg-brown"
              src={thumbnail}
              alt={title}
            />
          </div>
        </Link>
        <div className="text-center py-4">
          <a className="h6 text-decoration-none text-white" href="#">
            {title}
          </a>
          <div className="d-flex align-items-center justify-content-center mt-2">
            <h5 className="text-white">${price}</h5>
            <h6 className="ml-2">
              <del className="text-white">{discountPercentage}%</del>
            </h6>
          </div>
          <div className="d-flex align-items-center justify-content-center mb-1">
            {[...Array(5)].map((_, index) => (
              <small
                key={index}
                className={`fa fa-star ${
                  index < rating ? 'text-primary' : 'text-white'
                }`}
              />
            ))}
            <small className="text-white">({rating})</small>
          </div>
          {/* Add to Cart Button */}
          <button
            className="btn btn-dark mt-2"
            onClick={() => {
              addItem({ ...data, quantity: 1 });
            }}
          >
            <i className="fa fa-shopping-cart mr-1" /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;
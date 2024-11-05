import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProductDeatail } from '../ProductDetailSlice';
import RelatedProduct from './RelatedProduct';
import ReviewProduct from './ReviewProduct';
import { addToCart, decreaseItem, increaseItem } from '../../cart/CartSlice';

const DetailItem = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const detail = useSelector((state) => state.productDetail.detail);
  const user = useSelector((state) => state.Auth.loggedInUser);
  const [mainImage, setMainImage] = useState(null);
  const [quantity, setQuantity] = useState(1); // State to handle product quantity

  useEffect(() => {
    dispatch(fetchProductDeatail(id));
  }, [id]);

  function increaseQuantity() {
    setQuantity(quantity + 1); // Update quantity
    dispatch(increaseItem({ product: id }));
  }

  function decreaseQuantity() {
    if (quantity > 1) {
      setQuantity(quantity - 1); // Update quantity
      dispatch(decreaseItem({ product: id }));
    }
  }

  function addCart() {
    dispatch(addToCart({ product: id, quantity }));
  }

  useEffect(() => {
    window.scrollTo(0, 100);
  }, [id]);

  const changeImage = (src) => {
    setMainImage(src);
  };

  if (!detail) return <div>Loading...</div>;

  return (
    <div className="container-fluid py-2">
      <div className="row px-xl-5">
        {/* Left - Product Images */}
        <div className="col-lg-5 mb-30">
          <div className="product-images">
            <div className="main-image">
              <img
                src={mainImage || detail.thumbnail}
                alt="Main Product"
                className="img-fluid zoom-img"
              />
            </div>
            <div className="small-images d-flex mt-3">
              {detail.images && detail.images.length > 0 ? (
                detail.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Image ${index}`}
                    className="img-thumbnail me-2"
                    onClick={() => changeImage(image)}
                  />
                ))
              ) : (
                <div>No images available.</div>
              )}
            </div>
          </div>
        </div>

        {/* Right - Product Details */}
        <div className="col-lg-7 h-auto mb-30">
          <div className="h-100 bg-light p-30">
            <h3>{detail.title}</h3>
            <div className="d-flex mb-3">
              <div className="text-primary mr-2">
                {Array.from({ length: 5 }, (_, i) => (
                  <small
                    key={i}
                    className={
                      i < Math.floor(detail.rating)
                        ? 'fas fa-star'
                        : i < detail.rating
                        ? 'fas fa-star-half-alt'
                        : 'far fa-star'
                    }
                  />
                ))}
              </div>
              <small className="pt-1">({detail.rating} Reviews)</small>
            </div>
            <h3 className="font-weight-semi-bold mb-4">${detail.price}</h3>
            <p className="mb-4">{detail.description}</p>
            <div className="mb-4">
              <h5 className="bg-primary text-white p-2">Information:</h5>
              <ul className="list-unstyled mb-0">
                <li className="mb-2">
                  <strong>Availability:</strong>{' '}
                  {detail.availabilityStatus || 'Out Of Stock'}
                </li>
                <li className="mb-2">
                  <strong>Brand:</strong> {detail.brand || 'Generic'}
                </li>
                <li className="mb-2">
                  <strong>Tags:</strong>{' '}
                  {detail.tags &&
                    detail.tags.map((item, index) => (
                      <span key={index} className="m-1">
                        {item}
                      </span>
                    ))}
                </li>
                <li className="mb-2">
                  <strong>Shipping:</strong>{' '}
                  {detail.shippingInformation || '3 Days'}
                </li>
                <li className="mb-2">
                  <strong>Return Policy:</strong>{' '}
                  {detail.returnPolicy || 'No return policy'}
                </li>
              </ul>
            </div>
            <div className="d-flex align-items-center mb-4 pt-2">
              <div className="input-group quantity mr-3" style={{ width: 130 }}>
                <div className="input-group-btn">
                  <button
                    className="btn btn-primary btn-minus"
                    onClick={decreaseQuantity}
                  >
                    <i className="fa fa-minus" />
                  </button>
                </div>
                <input
                  type="text"
                  className="form-control bg-secondary border-0 text-center"
                  value={quantity}
                  readOnly
                />
                <div className="input-group-btn">
                  <button
                    className="btn btn-primary btn-plus"
                    onClick={increaseQuantity}
                  >
                    <i className="fa fa-plus" />
                  </button>
                </div>
              </div>
              <button className="btn btn-primary px-3" onClick={addCart}>
                <i className="fa fa-shopping-cart mr-1" /> Add To Cart
              </button>
            </div>
            <div className="d-flex pt-2">
              <strong className="text-dark mr-2">Share on:</strong>
              <div className="d-inline-flex">
                <a className="text-dark px-2" href="#">
                  <i className="fab fa-facebook-f" />
                </a>
                <a className="text-dark px-2" href="#">
                  <i className="fab fa-twitter" />
                </a>
                <a className="text-dark px-2" href="#">
                  <i className="fab fa-linkedin-in" />
                </a>
                <a className="text-dark px-2" href="#">
                  <i className="fab fa-pinterest" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews and Related Products */}
        <div className="row px-xl-5">
          <div className="col">
            <div className="bg-secondary p-30">
              {/* Reviews Section */}
              <ReviewProduct data={detail} key={detail.id} />
              {/* Related Products Section */}
              {<RelatedProduct category={detail.category} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailItem;
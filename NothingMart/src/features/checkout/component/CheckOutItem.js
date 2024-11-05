import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../Auth/AuthSlice';
import { getTotalPrice } from '../../../common/common';
import { createOrder } from '../../order/OrderSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { clearCart } from '../../cart/CartSlice';
import { useNavigate } from 'react-router-dom';
import BillingInfo from './BillingInfo';
import ShippingInfo from './ShippingInfo';
import TotalOrderInfo from './TotalOrderInfo';

function Check() {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const dispatch = useDispatch();
  const arrCart = useSelector((state) => state.cart.arrCart);
  const user = useSelector((state) => state.Auth.loggedInUser);
  const navigate = useNavigate();
  const totalPrice = getTotalPrice(arrCart);
  const { reset } = useForm();

  const orderSummaryRef = useRef(null); // Create a reference for the order summary section

  const handleAddressChange = (item) => setSelectedAddress(item);

  const handlePaymentChange = (e) => setSelectedPayment(e.target.value);

  const handleOnSubmit = (data) => {
    dispatch(updateUser({ ...user, address: [...user.address, data] }));
    reset();
    toast.success('Address updated successfully!');
  };

  const handleOrder = () => {
    if (!selectedAddress)
      return toast.error('Please select a shipping address');
    if (!selectedPayment) return toast.error('Please select a payment method.');
    if (arrCart.length === 0) return toast.error('Your cart is empty.');

    const order = {
      arrCart,
      totalPrice,
      totalItem: arrCart.length,
      paymentMethod: selectedPayment,
      status: 'Pending',
      selectedAddress,
      date: new Date(),
    };

    dispatch(createOrder(order))
      .unwrap()
      .then(() => {
        dispatch(clearCart());
        toast.success('Order placed successfully!');
        setTimeout(() => navigate('/'), 5000);
      })
      .catch((error) =>
        toast.error('Order placement failed. Please try again.')
      );
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row px-xl-5">
          <div className="col-md-7">
            <div className="card">
              <div className="card-body">
                <ol className="activity-checkout mb-0 px-2 mt-3">
                  <BillingInfo handleOnSubmit={handleOnSubmit} />
                  <ShippingInfo
                    user={user}
                    handleAddressChange={handleAddressChange}
                  />
                  <li className="checkout-item">
                    <div className="avatar checkout-icon p-1">
                      <div className="avatar-title rounded-circle bg-primary">
                        <i className="bx bxs-package text-white font-size-20" />
                      </div>
                    </div>
                    <div className="feed-item-list">
                      <h5 className="font-size-16 mb-1">Order Summary</h5>
                      <p className="text-muted text-truncate mb-0">
                        Order details are listed below.
                      </p>
                    </div>
                  </li>
                </ol>
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <h5 className="section-title position-relative text-uppercase mb-3">
              <span className="bg-secondary pr-3">Order Total</span>
            </h5>
            <TotalOrderInfo arrCart={arrCart} />
            <div className="mb-5">
              <h5 className="section-title position-relative text-uppercase mb-3">
                <span className="bg-secondary pr-3">Payment</span>
              </h5>
              <div className="bg-light p-30">
                <div className="form-group">
                  <div className="custom-control custom-radio">
                    <input
                      type="radio"
                      className="custom-control-input"
                      name="payment"
                      id="cash"
                      value="cash"
                      onChange={handlePaymentChange}
                    />
                    <label className="custom-control-label" htmlFor="cash">
                      Cash
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <div className="custom-control custom-radio">
                    <input
                      type="radio"
                      className="custom-control-input"
                      name="payment"
                      id="card"
                      value="debit/credit card"
                      onChange={handlePaymentChange}
                    />
                    <label className="custom-control-label" htmlFor="card">
                      Debit/Credit Card
                    </label>
                  </div>
                </div>
                <div className="form-group mb-4">
                  <div className="custom-control custom-radio">
                    <input
                      type="radio"
                      className="custom-control-input"
                      name="payment"
                      id="upi"
                      value="phonePay/GPay UPI"
                      onChange={handlePaymentChange}
                    />
                    <label className="custom-control-label" htmlFor="upi">
                      PhonePay/GPay UPI
                    </label>
                  </div>
                </div>
                <button
                  className="btn btn-block btn-primary font-weight-bold py-3"
                  onClick={handleOrder}
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Check;

import React, { useEffect, useState } from 'react';
import { getOrder } from '../OrderSlice';
import { useDispatch, useSelector } from 'react-redux';

// Function to get progress percentage based on status
const getStatusProgress = (status) => {
  switch (status) {
    case 'Delivered':
      return 100;
    case 'Shipped':
      return 75;
    case 'Dispatch':
      return 50;
    case 'Processing':
      return 35;
    case 'Pending':
      return 25;
    case 'Cancel':
      return 0;
    default:
      return 0;
  }
};

const OrderHistory = () => {
  const [openOrderId, setOpenOrderId] = useState(null); // State to track which order is open

  const user = useSelector((state) => state.Auth.loggedInUser);
  const orders = useSelector((state) => state.order.userOrder) || []; // Ensure orders is always an array
  const dispatch = useDispatch();

  // Toggle order detail visibility
  const toggleOrderDetail = (id) => {
    setOpenOrderId(openOrderId === id ? null : id);
  };

  useEffect(() => {
    if (user) {
      dispatch(getOrder());
    }
  }, [user, dispatch]);

  useEffect(() => {
    window.scrollTo(0, 100);
  }, [dispatch]);

  if (orders.length === 0) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <h3 className="text-light">Order Not Found</h3>
      </div>
    );
  }

  // Sort orders by date in descending order
  const sortedOrders = [...orders].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="container mt-4" style={{ color: '#f8f9fa' }}>
      <h3 className="mb-4 text-center text-light">Order History</h3>

      {sortedOrders.map((order) => (
        <div
          key={order.id}
          className="card mb-4"
          style={{ backgroundColor: '#3a3a3a', color: '#ffff' }}
        >
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-2 text-primary">
                Order #{order.id}
              </h5>

              {/* Order Status Progress */}
              <div className="progress" style={{ width: '200px' }}>
                <div
                  className={`progress-bar ${
                    order.status === 'Delivered' ? 'bg-success' : 'bg-info'
                  }`}
                  role="progressbar"
                  style={{ width: `${getStatusProgress(order.status)}%` }}
                  aria-valuenow={getStatusProgress(order.status)}
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  {order.status}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="row mt-3">
              <div className="col-md-6">
                <p className="mb-1">
                  <strong>Date:</strong>{' '}
                  {new Date(order?.date).toLocaleDateString('en-GB')}
                </p>

                <p className="mb-1">
                  <strong>Total Item:</strong> {order?.totalItem}
                </p>
                <p className="mb-1">
                  <strong>Payment:</strong> {order?.paymentMethod}
                </p>
                <p className="mb-1">
                  <strong>Shipping Address:</strong>{' '}
                  {order?.selectedAddress?.address ? (
                    <>
                      {order.selectedAddress.address},{' '}
                      {order.selectedAddress.city},
                      {order.selectedAddress.postalCode},{' '}
                      {order.selectedAddress.name}
                    </>
                  ) : (
                    'Address not available'
                  )}
                </p>
              </div>
              <div className="col-md-6 text-end">
                <p className="mb-1">
                  Subtotal: ${order?.totalPrice.toFixed(2)}
                </p>
                <p className="mb-1">Shipping: $10</p>
                <p className="mb-1">
                  <strong>Total: ${(order?.totalPrice + 10).toFixed(2)}</strong>
                </p>
              </div>
            </div>

            {/* Toggle Button */}
            <div className="text-end">
              <button
                className="btn btn-outline-light btn-sm"
                onClick={() => toggleOrderDetail(order?.id)}
              >
                {openOrderId === order?.id
                  ? 'Hide Details'
                  : 'View Order Detail'}
              </button>
            </div>

            {/* Order Items (Toggle Visibility) */}
            {openOrderId === order?.id && (
              <div className="order-items mt-3">
                {order?.arrCart.map((item, index) => (
                  <div key={index} className="d-flex align-items-center mb-3 ">
                    <img
                      src={item.product.thumbnail}
                      alt={item.product.title}
                      className="img-thumbnail me-3"
                      style={{ width: '80px', height: '80px' }}
                    />
                    <div className="ml-2">
                      <h6 className="mb-1 text-secondary">
                        {item.product.title}
                      </h6>
                      <small>Category: {item.product.category}</small>
                      <p className="mb-1">Quantity: {item?.quantity}</p>
                      <p className="mb-1">
                        Price: ${item?.product.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;

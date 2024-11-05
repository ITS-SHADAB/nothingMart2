import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  allgetOrder,
  deleteOrder,
  updateOrderAsync,
} from '../order/OrderSlice';

function AdminOrderDetail() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [editable, setEditable] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.allOrder);

  useEffect(() => {
    dispatch(allgetOrder());
  }, [dispatch]);

  if (orders === null) return <div>Loading.....</div>;

  const toggleModal = (order) => {
    setSelectedOrder(order);
    setShowModal(!showModal);
  };

  const editOrder = (id) => {
    setEditable(id);
  };

  const handleUpdate = (e, order) => {
    const updateOrder = {
      ...order,
      status: e.target.value,
      orderId: order._id,
      user: order.user.id,
    };

    dispatch(updateOrderAsync(updateOrder));
    setEditable(null);
  };

  const handleDelete = (order) => {
    console.log(order);
    dispatch(deleteOrder({ orderId: order }));
  };

  // Sort orders
  const sortedOrders = [...orders].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        <div className="col">
          <h2>All Orders</h2>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="thead-dark">
                <tr>
                  <th>SN.</th>
                  <th>ID</th>
                  <th>Customer</th>
                  <th>Order Date</th>
                  <th>Total Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {sortedOrders.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item?._id}</td>
                    <td>{item?.user?.name}</td>
                    <td>{item?.date?.split('T')[0]}</td>
                    <td>${item?.totalPrice.toFixed(2)}</td>
                    <td>
                      {editable === item?._id ? (
                        <select onChange={(e) => handleUpdate(e, item)}>
                          <option value={'Pending'}>Pending</option>
                          <option value={'Delivered'}>Delivered</option>
                          <option value={'Dispatch'}>Dispatch</option>
                          <option value={'Processing'}>Processing</option>
                          <option value={'Shipped'}>Shipped</option>
                          <option value={'Cancel'}>Canacel</option>
                        </select>
                      ) : (
                        <span className="badge text-info">{item?.status}</span>
                      )}
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-info mr-1"
                        onClick={() => toggleModal(item)}
                      >
                        View
                      </button>

                      <button
                        className="btn btn-sm btn-warning mr-1"
                        onClick={() => editOrder(item?._id)}
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-sm btn-danger mr-1"
                        onClick={() => handleDelete(item?._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal for order details */}
      {showModal && selectedOrder && (
        <div
          className="modal"
          tabIndex="-1"
          role="dialog"
          style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Order Details</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowModal(false)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div
                className="modal-body"
                style={{
                  maxHeight: '75vh', // Responsive height based on viewport
                  overflowY: 'auto',
                  padding: '10px', // Adjust padding if needed
                }}
              >
                {/* Order details */}
                <h6>Order ID: {selectedOrder._id}</h6>
                <p>
                  <strong>Status:</strong> {selectedOrder.status}
                </p>

                <h6>User Information:</h6>
                <p>
                  <strong>Name:</strong> {selectedOrder.user.name}
                </p>
                <p>
                  <strong>Email:</strong> {selectedOrder.user.email}
                </p>

                <h6>Selected Address:</h6>
                <p>
                  <strong>Name:</strong> {selectedOrder.selectedAddress.name}
                </p>
                <p>
                  <strong>Address:</strong>{' '}
                  {selectedOrder.selectedAddress.address},{' '}
                  {selectedOrder.selectedAddress.city},{' '}
                  {selectedOrder.selectedAddress.postalCode}
                </p>
                <p>
                  <strong>Email:</strong> {selectedOrder.selectedAddress.email}
                </p>
                <p>
                  <strong>Phone:</strong> {selectedOrder.selectedAddress.phone}
                </p>

                <h6>Ordered Items:</h6>
                <ul>
                  {selectedOrder.arrCart.map((item, index) => (
                    <li key={index}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div>
                          <img
                            src={item.product.thumbnail}
                            alt=""
                            style={{ width: 50, marginRight: 10 }}
                          />
                          <p>
                            <strong>Product:</strong> {item.product.title}
                          </p>
                          <p>
                            <strong>Quantity:</strong> {item.quantity}
                          </p>
                          <p>
                            <strong>Price per Unit:</strong> $
                            {item.product.price}
                          </p>
                          <p>
                            <strong>Total Price:</strong> $
                            {item.product.price * item.quantity}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <p>
                  <strong>Total Order Price:</strong> $
                  {selectedOrder.totalPrice.toFixed(2)}
                </p>
                <p>
                  <strong>Selected Payment Method:</strong>{' '}
                  {selectedOrder.paymentMethod}
                </p>
              </div>
              <div className="modal-footer" style={{ padding: '10px' }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminOrderDetail;

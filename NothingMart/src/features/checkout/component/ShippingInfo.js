import React from 'react';

const ShippingInfo = ({ user, handleAddressChange }) => {
  return (
    <li className="checkout-item">
      <div className="avatar checkout-icon p-1">
        <div className="avatar-title rounded-circle bg-primary">
          <i className="bx bxs-truck text-white font-size-20" />
        </div>
      </div>
      <div className="feed-item-list">
        <div>
          <h5 className="font-size-16 mb-1">Shipping Info</h5>
          <p className="text-muted text-truncate mb-4">
            Neque porro quisquam est
          </p>
          <div className="mb-3">
            <div className="row">
              {/* Address */}
              {user?.address.map((item, index) => (
                <div className="col-lg-5 col-sm-6 m-1" key={index}>
                  <div data-bs-toggle="collapse">
                    <label className="card-radio-label mb-0">
                      <input
                        type="radio"
                        name="address"
                        id={`info-address${index}`}
                        className="card-radio-input"
                        defaultChecked=""
                        onClick={() => handleAddressChange(item)}
                      />
                      <div className="card-radio text-truncate p-1">
                        <span className="fs-14 mb-4 d-block">
                          Address {index + 1}
                        </span>
                        <span className="fs-14 mb-2 d-block">{item.name}</span>
                        <span className="text-muted fw-normal text-wrap mb-1 d-block">
                          {item.postalCode} {item.address}
                        </span>
                        <span className="text-muted fw-normal d-block">
                          {item.phone}
                        </span>
                      </div>
                    </label>
                    <div className="edit-btn bg-light rounded">
                      <a
                        href="#"
                        data-bs-toggle="tooltip"
                        data-placement="top"
                        title=""
                        data-bs-original-title="Edit"
                      >
                        <i className="bx bx-pencil font-size-16" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default ShippingInfo;

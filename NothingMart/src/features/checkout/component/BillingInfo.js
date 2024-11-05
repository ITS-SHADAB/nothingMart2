import React from 'react';
import { useForm } from 'react-hook-form';

function BillingInfo({ handleOnSubmit }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  return (
    <li className="checkout-item">
      <div className="avatar checkout-icon p-1">
        <div className="avatar-title rounded-circle bg-primary">
          <i className="bx bxs-receipt text-white font-size-20" />
        </div>
      </div>
      <div className="feed-item-list">
        <div>
          <h5 className="font-size-16 mb-1">Billing Info</h5>
          <p className="text-muted text-truncate mb-4">
            Sed ut perspiciatis unde omnis iste
          </p>
          <form onSubmit={handleSubmit(handleOnSubmit)}>
            <div className="mb-3">
              <div className="row">
                <div className="col-lg-4">
                  <div className="mb-3">
                    <label className="form-label" htmlFor="billing-name">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="billing-name"
                      placeholder="Enter name"
                      {...register('name', { required: true })}
                    />
                    {errors.name && <span>This field is required</span>}
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="mb-3">
                    <label
                      className="form-label"
                      htmlFor="billing-email-address"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="billing-email-address"
                      placeholder="Enter email"
                      {...register('email', {
                        required: true,
                        pattern:
                          /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      })}
                    />
                    {errors.email && <span>This field is required</span>}
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="mb-3">
                    <label className="form-label" htmlFor="billing-phone">
                      Phone
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="billing-phone"
                      placeholder="Enter Phone no."
                      {...register('phone', { required: true })}
                    />
                    {errors.phone && <span>This field is required</span>}
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="billing-address">
                  Address
                </label>
                <textarea
                  className="form-control"
                  id="billing-address"
                  rows={3}
                  placeholder="Enter full address"
                  {...register('address', { required: true })}
                />
                {errors.address && <span>This field is required</span>}
              </div>
              <div className="row">
                <div className="col-lg-4">
                  <div className="mb-4 mb-lg-0">
                    <label className="form-label" htmlFor="billing-city">
                      City
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="billing-city"
                      placeholder="Enter City"
                      {...register('city', { required: true })}
                    />
                    {errors.city && <span>This field is required</span>}
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="mb-0">
                    <label className="form-label" htmlFor="zip-code">
                      Zip / Postal code
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="zip-code"
                      placeholder="Enter Postal code"
                      {...register('postalCode', {
                        required: true,
                      })}
                    />
                    {errors.postalCode && <span>This field is required</span>}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-light p-20 text-center round-3">
              <button className="btn btn-block btn-primary font-weight-bold py-2 rounded-pill">
                Update Address
              </button>
            </div>
          </form>
        </div>
      </div>
    </li>
  );
}

export default BillingInfo;

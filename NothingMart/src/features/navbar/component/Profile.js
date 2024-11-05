import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../Auth/AuthSlice';

// Dummy user data
const userData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+91 1234567890',
  address: [
    {
      name: 'Home',
      email: 'home@example.com',
      phone: '+91 1234567890',
      address: '123 Main St',
      city: 'Noida',
      postalCode: '201301',
    },
    {
      name: 'Office',
      email: 'office@example.com',
      phone: '+91 0987654321',
      address: '456 Another St',
      city: 'Noida',
      postalCode: '201302',
    },
  ],
};

const Profile = () => {
  const [selectedEdit, setSelectedEdit] = useState(-1);
  const [showAddForm, setShowAddForm] = useState(false);
  const user = useSelector((state) => state.Auth.loggedInUser);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleEdit = (data, index) => {
    const newUser = { ...user, address: [...user.address] };
    newUser.address.splice(index, 1, data);
    dispatch(updateUser(newUser));

    setSelectedEdit(-1); // Close edit form after saving
  };

  const handleRemoveAddress = (index) => {
    const newUser = { ...user, address: [...user.address] }; //this is copy the main content
    //because original didnot direct change
    newUser.address.splice(index, 1);

    dispatch(updateUser(newUser));
  };

  const handleAddAddress = (data) => {
    dispatch(updateUser({ ...user, address: [...user.address, data] }));
    setShowAddForm(false); // Hide the add form after submission
    reset(); // Reset the form
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center text-light">Manage Addresses</h2>
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">User Information</h5>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Phone:</strong> {user?.address[0]?.phone}
          </p>
        </div>
      </div>

      <button
        className="btn btn-primary mb-3"
        onClick={() => setShowAddForm(true)}
      >
        Add Address
      </button>

      {showAddForm && (
        <form onSubmit={handleSubmit(handleAddAddress)} className="mb-4">
          <h5 className="mb-3">Add New Address</h5>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter name"
              {...register('name', { required: true })}
            />
            {errors.name && (
              <span className="text-danger">This field is required</span>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              {...register('email', { required: true })}
            />
            {errors.email && (
              <span className="text-danger">This field is required</span>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Phone no."
              {...register('phone', { required: true })}
            />
            {errors.phone && (
              <span className="text-danger">This field is required</span>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Address</label>
            <textarea
              className="form-control"
              rows={3}
              placeholder="Enter full address"
              {...register('address', { required: true })}
            />
            {errors.address && (
              <span className="text-danger">This field is required</span>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">City</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter City"
              {...register('city', { required: true })}
            />
            {errors.city && (
              <span className="text-danger">This field is required</span>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Zip / Postal code</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Postal code"
              {...register('postalCode', { required: true })}
            />
            {errors.postalCode && (
              <span className="text-danger">This field is required</span>
            )}
          </div>
          <div className="text-center">
            <button
              className="btn btn-secondary mx-2"
              onClick={() => setShowAddForm(false)}
            >
              Cancel
            </button>
            <button className="btn btn-primary" type="submit">
              Add Address
            </button>
          </div>
        </form>
      )}

      <h5 className="mb-3 text-light">Existing Addresses</h5>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {user.address.map((item, index) => (
          <div className="col mb-4" key={index}>
            <div className="card position-relative">
              <div className="card-body">
                <input
                  type="radio"
                  name="address"
                  id={`info-address${index}`}
                  className="card-radio-input"
                />
                <span className="d-flex justify-content-end">
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleRemoveAddress(index)}
                  >
                    X
                  </button>
                </span>
                <label
                  htmlFor={`info-address${index}`}
                  className="card-radio-label"
                >
                  <div className="card-radio text-truncate">
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
                <div className="edit-btn bg-light rounded position-absolute top-0 start-100 translate-middle">
                  <a
                    href="#"
                    data-bs-toggle="tooltip"
                    data-placement="top"
                    title="Edit"
                  >
                    <i
                      className="bx bx-pencil font-size-16"
                      onClick={() => setSelectedEdit(index)}
                    />
                  </a>
                </div>
                {selectedEdit === index && (
                  <form
                    onSubmit={handleSubmit((data) => {
                      handleEdit(data, index);
                      reset();
                    })}
                    className="mt-3"
                  >
                    <h6>Edit Address</h6>
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter name"
                        defaultValue={item.name}
                        {...register('name', { required: true })}
                      />
                      {errors.name && (
                        <span className="text-danger">
                          This field is required
                        </span>
                      )}
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Email Address</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                        defaultValue={item.email}
                        {...register('email', { required: true })}
                      />
                      {errors.email && (
                        <span className="text-danger">
                          This field is required
                        </span>
                      )}
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Phone</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Phone no."
                        defaultValue={item.phone}
                        {...register('phone', { required: true })}
                      />
                      {errors.phone && (
                        <span className="text-danger">
                          This field is required
                        </span>
                      )}
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Address</label>
                      <textarea
                        className="form-control"
                        rows={3}
                        defaultValue={item.address}
                        {...register('address', { required: true })}
                      />
                      {errors.address && (
                        <span className="text-danger">
                          This field is required
                        </span>
                      )}
                    </div>
                    <div className="mb-3">
                      <label className="form-label">City</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter City"
                        defaultValue={item.city}
                        {...register('city', { required: true })}
                      />
                      {errors.city && (
                        <span className="text-danger">
                          This field is required
                        </span>
                      )}
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Zip / Postal code</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Postal code"
                        defaultValue={item.postalCode}
                        {...register('postalCode', { required: true })}
                      />
                      {errors.postalCode && (
                        <span className="text-danger">
                          This field is required
                        </span>
                      )}
                    </div>
                    <div className="text-center">
                      <button
                        className="btn btn-secondary mx-2"
                        onClick={() => setSelectedEdit(-1)}
                      >
                        Cancel
                      </button>
                      <button className="btn btn-primary" type="submit">
                        Save Changes
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;

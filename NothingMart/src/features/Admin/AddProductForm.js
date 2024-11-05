import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../Product/ProductSlice';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddProductForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = useSelector((state) => state.category.data);

  const dataSubmit = (data) => {
    const product = { ...data };
    product.images = [
      product.image1,
      product.image2,
      product.image3,
      product.thumbnail,
    ];
    delete product['image1'];
    delete product['image2'];
    delete product['image3'];

    dispatch(createProduct(product));

    // Display toast notification
    toast.success('Product added successfully! Redirecting...', {
      position: 'top-right',
      autoClose: 3000, // Close the toast automatically after 3 seconds
    });

    // Navigate after 4 seconds
    setTimeout(() => {
      navigate('/admin-product');
    }, 4000);

    reset(); // Optionally reset the form after submission
  };

  return (
    <div className="container mt-5">
      <ToastContainer /> {/* This container displays the toast notifications */}
      <h2 className="mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit(dataSubmit)}>
        {/* Product Title */}
        <div className="form-group">
          <label htmlFor="title">Product Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Enter product title"
            {...register('title', { required: true })}
          />
        </div>
        {/* Product Description */}
        <div className="form-group">
          <label htmlFor="description">Product Description</label>
          <textarea
            className="form-control"
            id="description"
            rows={3}
            placeholder="Enter product description"
            {...register('description', { required: true })}
          />
        </div>
        {/* Product Price */}
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            className="form-control"
            id="price"
            placeholder="Enter product price"
            {...register('price', { required: true })}
          />
        </div>
        {/* Discount Percentage */}
        <div className="form-group">
          <label htmlFor="discountPercentage">Discount Percentage</label>
          <input
            type="number"
            className="form-control"
            id="discountPercentage"
            placeholder="Enter discount percentage"
            {...register('discountPercentage', { required: true })}
          />
        </div>
        {/* Product Rating */}
        <div className="form-group">
          <label htmlFor="rating">Rating</label>
          <input
            type="number"
            className="form-control"
            id="rating"
            placeholder="Enter product rating"
            {...register('rating', { required: true })}
          />
        </div>
        {/* Product Stock */}
        <div className="form-group">
          <label htmlFor="stock">Stock</label>
          <input
            type="number"
            className="form-control"
            id="stock"
            placeholder="Enter product stock"
            {...register('stock', { required: true })}
          />
        </div>
        {/* Product Brand */}
        <div className="form-group">
          <label htmlFor="brand">Brand</label>
          <input
            type="text"
            className="form-control"
            id="brand"
            placeholder="Enter product brand"
            {...register('brand', { required: true })}
          />
        </div>
        {/* Product Category */}
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            className="form-control"
            id="category"
            {...register('category', { required: true })}
          >
            <option value="">Select product category</option>

            {categories.map((category, index) => (
              <option key={category.slug} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Product Thumbnail URL */}
        <div className="form-group">
          <label htmlFor="thumbnail">Thumbnail URL</label>
          <input
            type="text"
            className="form-control"
            id="thumbnail"
            placeholder="Enter product thumbnail URL"
            {...register('thumbnail', { required: true })}
          />
        </div>
        {/* Product Images URLs */}
        <div className="form-group">
          <label htmlFor="image1">Images URL 1 </label>
          <input
            type="text"
            className="form-control"
            id="image1"
            placeholder="Enter product images URLs"
            {...register('image1', { required: true })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="image2">Images URL 2 </label>
          <input
            type="text"
            className="form-control"
            id="image2"
            placeholder="Enter product images URLs"
            {...register('image2', { required: true })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="image3">Images URL 3 </label>
          <input
            type="text"
            className="form-control"
            id="image3"
            placeholder="Enter product images URLs"
            {...register('image3', { required: true })}
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary mt-3">
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProductForm;

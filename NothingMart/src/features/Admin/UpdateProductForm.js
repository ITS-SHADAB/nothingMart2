import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchProductDeatail } from '../Product/ProductDetailSlice';
import { updateProduct } from '../Product/ProductSlice';

function UpdateProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.data);
  const arrDetail = useSelector((state) => state.productDetail.detail);

  useEffect(() => {
    dispatch(fetchProductDeatail(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (arrDetail) {
      setValue('title', arrDetail.title || '');
      setValue('description', arrDetail.description || '');
      setValue('price', arrDetail.price || '');
      setValue('discountPercentage', arrDetail.discountPercentage || '');
      setValue('rating', arrDetail.rating || '');
      setValue('stock', arrDetail.stock || '');
      setValue('brand', arrDetail.brand || '');
      setValue('category', arrDetail.category || '');
      setValue('thumbnail', arrDetail.thumbnail || '');
      if (arrDetail.images && arrDetail.images.length > 0) {
        setValue('image1', arrDetail.images[0] || '');
        setValue('image2', arrDetail.images[1] || '');
        setValue('image3', arrDetail.images[2] || '');
      }
    }
  }, [arrDetail, setValue]);

  const handleDelete = () => {
    const product = { id, ...arrDetail };
    product.deleted = true;
    dispatch(updateProduct(product));
    toast.success('Product deleted successfully!');
    reset();
    setTimeout(() => {
      reset();
      navigate('/admin-product');
    }, 4000);
  };

  const onSubmit = (data) => {
    const product = { id, ...data };
    product.images = [
      product.image1,
      product.image2,
      product.image3,
      product.thumbnail,
    ];
    delete product['image1'];
    delete product['image2'];
    delete product['image3'];

    // Ensure values are correctly parsed as numbers with decimals
    product.price = parseFloat(product.price);
    product.discountPercentage = parseFloat(product.discountPercentage);
    product.rating = parseFloat(product.rating);

    dispatch(updateProduct(product));

    toast.success('Product updated successfully!');
    reset();
    setTimeout(() => {
      reset();
      navigate('/admin-product');
    }, 4000);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Update Product</h2>
      <ToastContainer />
      <form onSubmit={handleSubmit(onSubmit)}>
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
        {/* Product Price (decimal allowed) */}
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            id="price"
            placeholder="Enter product price"
            {...register('price', { required: true })}
          />
        </div>
        {/* Discount Percentage (decimal allowed) */}
        <div className="form-group">
          <label htmlFor="discountPercentage">Discount Percentage</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            id="discountPercentage"
            placeholder="Enter discount percentage"
            {...register('discountPercentage', { required: true })}
          />
        </div>
        {/* Product Rating (decimal allowed) */}
        <div className="form-group">
          <label htmlFor="rating">Rating</label>
          <input
            type="number"
            step="0.01"
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
            {categories.map((category) => (
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
          <label htmlFor="image1">Images URL 1</label>
          <input
            type="text"
            className="form-control"
            id="image1"
            placeholder="Enter product images URLs"
            {...register('image1', { required: true })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="image2">Images URL 2</label>
          <input
            type="text"
            className="form-control"
            id="image2"
            placeholder="Enter product images URLs"
            {...register('image2', { required: true })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="image3">Images URL 3</label>
          <input
            type="text"
            className="form-control"
            id="image3"
            placeholder="Enter product images URLs"
            {...register('image3', { required: true })}
          />
        </div>
        <button
          type="button"
          className="btn btn-danger mt-3"
          onClick={handleDelete}
        >
          Delete Product
        </button>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary mt-3">
          Update Product
        </button>
      </form>
    </div>
  );
}

export default UpdateProductForm;

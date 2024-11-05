import React from 'react';
import { useSelector } from 'react-redux';
import SingleProduct from './SingleProduct';

function RelatedProduct({ category }) {
  const product = useSelector((state) => state.product.arrProduct);

  return (
    <>
      <div className="related-products mt-5">
        <h4 className="mb-4">Related Products</h4>
        <div className="row">
          {/* Placeholder for product cards */}

          {product
            .filter((e) => e.category == category)
            .map((item, index) => (
              // <div className="col-md-3" key={index}>
              //   <div className="product-card bg-light p-3 mb-4">
              //     <img
              //       src={item.thumbnail}
              //       className="img-fluid mb-3"
              //       alt="Product 1"
              //     />
              //     <h5>{item.title}</h5>
              //     <p>${item.price}</p>
              //   </div>
              // </div>
              <SingleProduct data={item} />
            ))}
        </div>
      </div>
    </>
  );
}

export default RelatedProduct;

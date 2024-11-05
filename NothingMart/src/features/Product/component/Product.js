import { useDispatch, useSelector } from 'react-redux';
import SingleProduct from './SingleProduct';
import { useEffect, useState, useRef } from 'react';
import { fetchproduct } from '../ProductSlice';
import Pagination from '../../../component/Pagination';
import { Pagination_action } from '../../../common/common';

function Product() {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.arrProduct);
  const selectedCategory = useSelector(
    (state) => state.category.selectedCategory
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Create a ref to scroll into view when page changes
  const featuredRef = useRef(null);

  const curentProduct = Pagination_action(product, currentPage, itemsPerPage);

  function onPageChange(page) {
    setCurrentPage(page);

    // Scroll to the Featured Products section when the page changes
    if (featuredRef.current) {
      featuredRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }

  useEffect(() => {
    dispatch(fetchproduct());
  }, [dispatch]);

  if (product.loading || product.length === 0) {
    return <div className="loading-spinner">Loading......</div>;
  }

  return (
    <>
      <div className="container-fluid pt-5 pb-3">
        {/* Add a ref to the section title */}
        <h2
          className="section-title position-relative text-uppercase mx-xl-5 mb-4"
          ref={featuredRef} // Reference for scrolling
        >
          <span className="bg-secondary pr-3">Featured Products</span>
        </h2>
        <div className="row px-xl-5">
          {selectedCategory == 'Categories'
            ? curentProduct.map((item, index) => (
                <SingleProduct data={item} key={item.id} />
              ))
            : product
                .filter((e) => e.category == selectedCategory.toLowerCase())
                .map((item, index) => (
                  <SingleProduct data={item} key={item.id} />
                ))}
        </div>
        {selectedCategory == 'Categories' ? (
          <Pagination
            totalItems={product.length}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            onPageChange={onPageChange}
          />
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default Product;

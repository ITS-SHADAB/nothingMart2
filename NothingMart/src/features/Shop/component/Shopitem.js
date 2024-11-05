import React, { useEffect, useState } from 'react';
import SingleProduct from '../../Product/component/SingleProduct';
import Filter from './Filter';
import Sorting from './Sorting';
import Pagination from '../../../component/Pagination';
import { useSelector } from 'react-redux';

function Shopitem() {
  const product = useSelector((state) => state.product.arrProduct);
  const selectedCategory = useSelector(
    (state) => state.category.selectedCategory
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // State for the price filter
  const [priceRange, setPriceRange] = useState([0, 1000]); // Example price range
  const [sortOption, setSortOption] = useState('Latest');

  useEffect(() => {
    window.scrollTo(0, 100);
  }, []);

  // Function to filter products by price
  const filterByPrice = (products) => {
    return products.filter((item) => {
      return item.price >= priceRange[0] && item.price <= priceRange[1];
    });
  };

  // Function to sort products based on selected option
  const sortProducts = (products) => {
    switch (sortOption) {
      case 'Latest':
        return products.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      case 'Popularity':
        return products.sort((a, b) => b.popularity - a.popularity);
      case 'Best Rating':
        return products.sort((a, b) => b.rating - a.rating);
      default:
        return products;
    }
  };

  // Apply the price filter to products based on the selected category
  let filteredProducts =
    selectedCategory === 'Categories'
      ? filterByPrice(product) // All products filtered by price
      : filterByPrice(
          product.filter((e) => e.category === selectedCategory.toLowerCase())
        ); // Products in the selected category filtered by price

  // Sort filtered products
  filteredProducts = sortProducts(filteredProducts);

  // Calculate total filtered products
  const totalFilteredProducts = filteredProducts.length;

  // Calculate the current products for pagination
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  function onPageChange(page) {
    setCurrentPage(page);
  }

  return (
    <>
      {/* Shop Start */}
      <div className="container-fluid">
        <div className="row px-xl-5">
          {/* Shop Sidebar Start */}
          <Filter setPriceRange={setPriceRange} />{' '}
          {/* Pass setter to Filter component */}
          {/* Shop Sidebar End */}
          {/* Shop Product Start */}
          <div className="col-lg-9 col-md-8">
            <div className="row pb-3">
              <Sorting onSortChange={setSortOption} />
              {currentProducts.map((item) => (
                <SingleProduct data={item} key={item.id} />
              ))}

              {/* Show pagination based on filtered products */}
              {totalFilteredProducts > itemsPerPage && (
                <Pagination
                  totalItems={totalFilteredProducts} // Use filtered products count
                  currentPage={currentPage}
                  itemsPerPage={itemsPerPage}
                  onPageChange={onPageChange}
                />
              )}
            </div>
          </div>
          {/* Shop Product End */}
        </div>
      </div>
      {/* Shop End */}
    </>
  );
}

export default Shopitem;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeCategory, fetchCategory } from '../navSlice';

function Category() {
  const categories = useSelector((state) => state.category.data);
  const selectedCategory = useSelector(
    (state) => state.category.selectedCategory
  );
  const dispatch = useDispatch();

  function selectCategory(e) {
    dispatch(changeCategory(e.target.textContent));

    // Close the collapse menu when a category is selected
    const navbarVertical = document.getElementById('navbar-vertical');
    if (navbarVertical.classList.contains('show')) {
      navbarVertical.classList.remove('show');
    }
  }

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  return (
    <div className="col-lg-3 d-none d-lg-block">
      {/* Trigger button for the vertical navbar */}
      <a
        className="btn d-flex align-items-center justify-content-between bg-primary w-100"
        data-bs-toggle="collapse"
        href="#navbar-vertical"
        style={{ height: 65, padding: '0 30px' }}
      >
        <h6 className="text-dark m-0">
          <i className="fa fa-bars mr-2" />
          {selectedCategory}
        </h6>
        <i className="fa fa-angle-down text-dark" />
      </a>

      {/* Vertical navbar */}
      <nav
        className="collapse position-absolute navbar navbar-vertical navbar-light align-items-start p-0 bg-light"
        id="navbar-vertical"
        style={{
          width: 'calc(100% - 30px)',
          zIndex: 999,
          maxHeight: '400px', // Set a max height for the navbar
          overflowY: 'auto', // Enable vertical scrolling
          overflowX: 'hidden', // Hide horizontal scrollbar
        }}
      >
        <div className="navbar-nav w-100">
          {/* List of categories */}
          {categories.map((item, index) => (
            <a
              key={index}
              className="nav-item nav-link"
              onClick={selectCategory}
            >
              {item.name.charAt(0).toUpperCase() +
                item.name.slice(1).toLowerCase()}
            </a>
          ))}
        </div>
      </nav>
    </div>
  );
}

export default Category;

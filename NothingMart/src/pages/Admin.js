import React from 'react';
import Carousel from '../features/Body/component/Caraousel';
import FeaturesProduct from '../features/Body/component/FeaturesProduct';
import Discount from '../features/Body/component/Discount';
import AdminProductList from '../features/Admin/AdminProductList';

function Admin() {
  return (
    <>
      <div className="headerbc">
        <Carousel />
        <FeaturesProduct />
      </div>

      <Discount />
      <AdminProductList />
    </>
  );
}

export default Admin;

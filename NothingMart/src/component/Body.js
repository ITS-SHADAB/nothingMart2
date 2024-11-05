import React from 'react';
import Discount from '../features/Body/component/Discount';
import ShopWithUs from '../features/Body/component/ShopWithUs';
import Product from '../features/Product/component/Product';
import Carousel from '../features/Body/component/Caraousel';
import FeaturesProduct from '../features/Body/component/FeaturesProduct';

function Body() {
  return (
    <>
      <div className="headerbc">
        <Carousel />
        <FeaturesProduct />
      </div>

      <Discount />
      <Product />
    </>
  );
}

export default Body;

import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from '../features/navbar/navSlice';
import productReducer from '../features/Product/ProductSlice';
import productDetailReducer from '../features/Product/ProductDetailSlice';
import cartReducer from '../features/cart/CartSlice';
import AuthSlice from '../features/Auth/AuthSlice';
import orderSlice from '../features/order/OrderSlice';

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    product: productReducer,
    productDetail: productDetailReducer,
    cart: cartReducer,
    Auth: AuthSlice,
    order: orderSlice,
  },
});

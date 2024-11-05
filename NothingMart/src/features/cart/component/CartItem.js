import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CartTable from './CartTable';
import CartSummary from './CartSummary';
import {
  decreaseItem,
  deleteCart,
  getAllCart,
  increaseItem,
} from '../CartSlice';
import LoadingIndicator from '../../../common/LoadingIndictor';

function CartItem() {
  const dispatch = useDispatch();
  const { arrCart, loading } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getAllCart());

    // Scroll to top when the cart is loaded
    window.scrollTo({
      top: 0, // Adjust to desired position
      behavior: 'smooth', // Smooth scroll animation
    });
  }, [dispatch]);

  if (loading) return <LoadingIndicator />;

  return (
    <div className="container-fluid bg-dark">
      <div className="row px-xl-5">
        <div className="col-lg-8 table-responsive mb-5">
          <CartTable
            arrCart={arrCart}
            onIncrease={(data) => dispatch(increaseItem(data))}
            onDecrease={(data) => dispatch(decreaseItem(data))}
            onRemove={(data) => dispatch(deleteCart(data))}
          />
        </div>
        <div className="col-lg-4">
          <CartSummary arrCart={arrCart} />
        </div>
      </div>
    </div>
  );
}

export default CartItem;

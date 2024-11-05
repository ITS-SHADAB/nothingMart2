// CartTable.js
import React from 'react';
import CartItemRow from './CartItemRow';

function CartTable({ arrCart, onIncrease, onDecrease, onRemove }) {
  return (
    <table className="table table-light table-borderless table-hover text-center mb-0">
      <thead className="thead-dark">
        <tr>
          <th>Products</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total</th>
          <th>Remove</th>
        </tr>
      </thead>
      <tbody className="align-middle">
        {arrCart.length === 0 ? (
          <tr>
            <td colSpan="5" className="text-center">
              <h2 className="text-dark">Cart Empty</h2>
            </td>
          </tr>
        ) : (
          arrCart.map((item, index) => (
            <CartItemRow
              key={index}
              item={item}
              onIncrease={onIncrease}
              onDecrease={onDecrease}
              onRemove={onRemove}
            />
          ))
        )}
      </tbody>
    </table>
  );
}

export default CartTable;

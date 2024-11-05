// CartItemRow.js
import React from 'react';

function CartItemRow({ item, onIncrease, onDecrease, onRemove }) {
  return (
    <tr>
      <td className="align-middle">
        <img src={item.product.thumbnail} alt="" style={{ width: 50 }} />
        {item.product.title}
      </td>
      <td className="align-middle">${item.product.price}</td>
      <td className="align-middle">
        <div className="input-group quantity mx-auto" style={{ width: 100 }}>
          <div className="input-group-btn">
            <button
              className="btn btn-sm btn-primary btn-minus"
              onClick={() => onDecrease({ product: item.product._id })}
            >
              <i className="fa fa-minus" />
            </button>
          </div>
          <input
            type="text"
            className="form-control form-control-sm bg-secondary border-0 text-center"
            value={item.quantity}
            readOnly
          />
          <div className="input-group-btn">
            <button
              className="btn btn-sm btn-primary btn-plus"
              onClick={() => onIncrease({ product: item.product._id })}
            >
              <i className="fa fa-plus" />
            </button>
          </div>
        </div>
      </td>
      <td className="align-middle">
        ${(item.product.price * item.quantity).toFixed(2)}
      </td>
      <td className="align-middle">
        <button
          className="btn btn-sm btn-danger"
          onClick={() => onRemove({ product: item.product._id })}
        >
          <i className="fa fa-times" />
        </button>
      </td>
    </tr>
  );
}

export default CartItemRow;

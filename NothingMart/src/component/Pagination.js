import React from 'react';
import { Link } from 'react-router-dom';

function Pagination({ totalItems, currentPage, itemsPerPage, onPageChange }) {
  const totalPage = Math.ceil(totalItems / itemsPerPage);
  function changePage(page) {
    if (currentPage > 0) {
      onPageChange(page);
    }
  }
  return (
    <div className="col-12">
      <nav>
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage > 1 ? '' : 'disabled'}`}>
            <a
              className="page-link"
              onClick={() => changePage(currentPage - 1)}
            >
              Previous
            </a>
          </li>

          {Array.from({ length: totalPage }, (_, index) => (
            <li
              className={`page-item ${
                currentPage === index + 1 ? 'active' : ''
              }`}
              key={index}
            >
              <Link
                className="page-link"
                to="#"
                onClick={() => changePage(index + 1)}
              >
                {index + 1}
              </Link>
            </li>
          ))}

          <li className="page-item">
            <a
              className="page-link"
              onClick={() => changePage(currentPage + 1)}
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Pagination;

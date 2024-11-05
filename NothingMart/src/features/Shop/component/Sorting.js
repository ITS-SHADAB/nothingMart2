import React, { useState } from 'react';

function Sorting({ onSortChange }) {
  const [selectedSort, setSelectedSort] = useState('Latest');

  const handleSortChange = (sortOption) => {
    setSelectedSort(sortOption);
    onSortChange(sortOption); // Call the sort change handler
  };

  return (
    <div className="col-12 pb-1">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <button className="btn btn-sm btn-light">
            <i className="fa fa-th-large" />
          </button>
          <button className="btn btn-sm btn-light ml-2">
            <i className="fa fa-bars" />
          </button>
        </div>
        <div className="ml-2">
          <div className="btn-group">
            <button
              type="button"
              className="btn btn-sm btn-light dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Sorting
            </button>
            <ul className="dropdown-menu dropdown-menu-right">
              <li>
                <a
                  className="dropdown-item"
                  onClick={() => handleSortChange('Latest')}
                >
                  Latest
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  onClick={() => handleSortChange('Popularity')}
                >
                  Popularity
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  onClick={() => handleSortChange('Best Rating')}
                >
                  Best Rating
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sorting;

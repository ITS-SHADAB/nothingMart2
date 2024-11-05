import React, { useState } from 'react';

function Filter({ setPriceRange }) {
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);

  const priceRanges = [
    { label: '$0 - $100', min: 0, max: 100 },
    { label: '$100 - $200', min: 100, max: 200 },
    { label: '$200 - $300', min: 200, max: 300 },
    { label: '$300 - $400', min: 300, max: 400 },
    { label: '$400 - $500', min: 400, max: 500 },
  ];

  const handlePriceChange = (range) => {
    const isSelected = selectedPriceRanges.includes(range);
    const newSelectedRanges = isSelected
      ? selectedPriceRanges.filter((item) => item !== range)
      : [...selectedPriceRanges, range];

    setSelectedPriceRanges(newSelectedRanges);

    // Update the price range in the parent component
    const newRange = newSelectedRanges.length
      ? [
          Math.min(...newSelectedRanges.map((r) => priceRanges[r].min)),
          Math.max(...newSelectedRanges.map((r) => priceRanges[r].max)),
        ]
      : [0, 1000]; // Default range if none selected
    setPriceRange(newRange);
  };

  return (
    <div className="col-lg-3 col-md-4">
      {/* Price Start */}
      <h5 className="section-title position-relative text-uppercase mb-3">
        <span className="bg-secondary pr-3">Filter by price</span>
      </h5>
      <div className="bg-light p-4 mb-30">
        <form>
          <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
            <input
              type="checkbox"
              className="custom-control-input"
              checked={selectedPriceRanges.length === priceRanges.length}
              onChange={() => {
                if (selectedPriceRanges.length === priceRanges.length) {
                  setSelectedPriceRanges([]);
                  setPriceRange([0, 1000]); // Reset to default
                } else {
                  setSelectedPriceRanges(priceRanges.map((_, index) => index));
                  setPriceRange([0, 500]); // Update to the maximum range
                }
              }}
              id="price-all"
            />
            <label className="custom-control-label" htmlFor="price-all">
              All Price
            </label>
            <span className="badge border font-weight-normal">1000</span>
          </div>
          {priceRanges.map((range, index) => (
            <div
              className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3"
              key={index}
            >
              <input
                type="checkbox"
                className="custom-control-input"
                checked={selectedPriceRanges.includes(index)}
                onChange={() => handlePriceChange(index)}
                id={`price-${index}`}
              />
              <label
                className="custom-control-label"
                htmlFor={`price-${index}`}
              >
                {range.label}
              </label>
              <span className="badge border font-weight-normal">150</span>
            </div>
          ))}
        </form>
      </div>
      {/* Price End */}
      {/* Color and Size sections... */}
    </div>
  );
}

export default Filter;

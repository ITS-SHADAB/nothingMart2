export function Pagination_action(product, currentPage, itemsPerPage) {
  const lastProduct = currentPage * itemsPerPage;
  const firstProduct = lastProduct - itemsPerPage;

  return product.slice(firstProduct, lastProduct);
}
export const getTotalPrice = (product) => {
  if (!Array.isArray(product)) {
    return 0; // or handle this case as needed
  }

  const total = product.reduce(
    (acc, item) => acc + (item?.quantity || 0) * (item?.product?.price || 0),
    0
  );
  return isNaN(total) ? 0 : total;
};
export const getAuthToken = () => {
  return localStorage.getItem('x-auth-token'); // Change this line if you store the token in cookies
};

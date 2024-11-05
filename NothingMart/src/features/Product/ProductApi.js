import { getAuthToken } from '../../common/common';

export function fetchproductApi() {
  return new Promise(async (resolve, reject) => {
    const token = getAuthToken();
    const resp = await fetch(`${window.location.origin}/products`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
    });
    if (!resp.ok) {
      throw new Error('Failed to fetch categories');
    }
    const data = await resp.json();
    resolve(data);
  });
}
export function fetchProductDetailApi(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const resp = await fetch(`${window.location.origin}/products/${id}`);

      // Check if the response is OK (status 200-299)
      if (!resp.ok) {
        throw new Error(`Failed to fetch product with status: ${resp.status}`);
      }

      // Check if there is a body to parse
      const data = await resp.json();
      if (!data) {
        throw new Error('No data returned from server');
      }

      resolve(data);
    } catch (error) {
      // Handle errors in the request or parsing the response
      reject(error.message);
    }
  });
}
export function fetchProductUpdateApi(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const token = getAuthToken();
      const resp = await fetch(
        `${window.location.origin}/products/${data.id}`,
        {
          method: 'PUT',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
        }
      );

      // Check if the response is OK (status 200-299)
      if (!resp.ok) {
        throw new Error(`Failed to fetch product with status: ${resp.status}`);
      }

      // Check if there is a body to parse
      const result = await resp.json();
      if (!result) {
        throw new Error('No data returned from server');
      }

      resolve(result);
    } catch (error) {
      // Handle errors in the request or parsing the response
      reject(error.message);
    }
  });
}
export function fetchCreateProduct(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const token = getAuthToken();
      const resp = await fetch(`${window.location.origin}/products`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
      });

      // Check if the response is OK (status 200-299)
      if (!resp.ok) {
        throw new Error(`Failed to fetch product with status: ${resp.status}`);
      }

      // Check if there is a body to parse
      const result = await resp.json();
      if (!result) {
        throw new Error('No data returned from server');
      }

      resolve(result);
    } catch (error) {
      // Handle errors in the request or parsing the response
      reject(error.message);
    }
  });
}

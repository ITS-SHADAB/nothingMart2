// Function to get the token from local storage

import { getAuthToken } from '../../common/common';

export function addCartItem(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const token = getAuthToken();

      const resp = await fetch(`${window.location.origin}/cart/addCart`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token, // Include the token in the request header
        },
      });
      if (!resp.ok) {
        return reject(new Error(`HTTP error! status: ${resp.status}`));
      }
      const result = await resp.json();
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}

export function fetchCartByUser() {
  return new Promise(async (resolve, reject) => {
    try {
      const token = getAuthToken();
      const resp = await fetch(`${window.location.origin}/cart`, {
        method: 'POST',
        body: JSON.stringify(),
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token, // Include the token in the request header
        },
      });
      if (!resp.ok) {
        return reject(new Error(`HTTP error! status: ${resp.status}`));
      }
      const result = await resp.json();
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}

export function fetchIncreaseItem(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const token = getAuthToken();
      const resp = await fetch(`${window.location.origin}/cart/increase`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token, // Include the token in the request header
        },
      });
      if (!resp.ok) {
        return reject(new Error(`HTTP error! status: ${resp.status}`));
      }
      const result = await resp.json();
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}

export function fetchDeccreaseItem(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const token = getAuthToken();
      const resp = await fetch(`${window.location.origin}/cart/decrease`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token, // Include the token in the request header
        },
      });
      if (!resp.ok) {
        return reject(new Error(`HTTP error! status: ${resp.status}`));
      }
      const result = await resp.json();
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}

export function deleteItem(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const token = getAuthToken();
      const resp = await fetch(`${window.location.origin}/cart/removeItem`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token, // Include the token in the request header
        },
      });

      if (!resp.ok) {
        throw new Error('Failed to delete item');
      }

      const result = await resp.json();
      resolve(result);
    } catch (error) {
      reject(error.message);
    }
  });
}

export function clearCartApi() {
  return new Promise(async (resolve, reject) => {
    try {
      const token = getAuthToken();
      const resp = await fetch(`${window.location.origin}/cart/clearCart`, {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token, // Include the token in the request header
        },
      });

      if (!resp.ok) {
        const errorResponse = await resp.json();
        throw new Error(errorResponse.message || 'Cart could not be cleared');
      }

      const result = await resp.json();
      resolve(result);
    } catch (error) {
      reject(error.message);
    }
  });
}

import { getAuthToken } from '../../common/common';

export function createOrderApi(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const token = getAuthToken();
      const resp = await fetch(`${window.location.origin}/order`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token, // Ensure token is included
        },
      });

      if (!resp.ok) throw new Error('Failed to create order'); // Improved error message
      const result = await resp.json();
      resolve(result);
    } catch (error) {
      reject(error.message);
    }
  });
}

export function getOrderApi() {
  return new Promise(async (resolve, reject) => {
    try {
      const token = getAuthToken();
      const resp = await fetch(`${window.location.origin}/order/id`, {
        method: 'POST',

        headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
      });
      if (!resp.ok) throw new Error('Failed order');
      const result = await resp.json();
      resolve(result);
    } catch (error) {
      reject(error.message);
    }
  });
}

export function allOrderApi() {
  return new Promise(async (resolve, reject) => {
    try {
      const token = getAuthToken();
      const resp = await fetch(`${window.location.origin}/order`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      });

      if (!resp.ok) throw new Error('Failed to fetch orders');
      const result = await resp.json();
      resolve(result);
    } catch (error) {
      reject(error.message);
    }
  });
}

export function deleteOrderApi(update) {
  return new Promise(async (resolve, reject) => {
    try {
      const token = getAuthToken(); // Include token
      const resp = await fetch(`${window.location.origin}/order`, {
        method: 'DELETE',
        body: JSON.stringify(update),
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token, // Include token
        },
      });

      if (!resp.ok) throw new Error('Failed to delete order');
      const data = await resp.json();
      resolve({ data });
    } catch (error) {
      reject(error.message);
    }
  });
}

export function updateOrderApi(update) {
  return new Promise(async (resolve, reject) => {
    try {
      const token = getAuthToken(); // Include token
      const resp = await fetch(`${window.location.origin}/order`, {
        method: 'PUT',
        body: JSON.stringify(update),
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token, // Include token
        },
      });

      if (!resp.ok) throw new Error('Failed to update order');
      const data = await resp.json();
      resolve({ data });
    } catch (error) {
      reject(error.message);
    }
  });
}

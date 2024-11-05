import { getAuthToken } from '../../common/common';

export function creatUserApi(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const resp = await fetch(`${window.location.origin}/user/register`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!resp.ok) {
        return reject(new Error(`HTTP error! status: ${resp.status}`));
      }

      const result = await resp.json();
      // Store the token in local storage if available
      const token = resp.headers.get('x-auth-token');
      if (token) {
        localStorage.setItem('x-auth-token', token);
      }

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}

export async function authenticationApi(data) {
  try {
    const resp = await fetch(`${window.location.origin}/user/login`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!resp.ok) {
      const errorData = await resp.json(); // Parse the error response body
      throw new Error(errorData || 'An error occurred');
    }

    const result = await resp.json();

    // Store the token in local storage if available
    const token = resp.headers.get('x-auth-token');
    if (token) {
      localStorage.setItem('x-auth-token', token);
    }

    return result; // Return user data or relevant info
  } catch (error) {
    throw error; // Throw the error to be caught in the component
  }
}

export function updateUserApi(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const token = getAuthToken();
      const resp = await fetch(`${window.location.origin}/user/update`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
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

export function signOutApi() {
  return new Promise(async (resolve) => {
    // Clear the token from local storage
    localStorage.removeItem('x-auth-token');
    resolve('Successfully signed out'); // Indicate success
  });
}

export function existUser() {
  return new Promise(async (resolve, reject) => {
    try {
      const token = getAuthToken();

      if (!token) resolve(null);

      const resp = await fetch(`${window.location.origin}/user/me`, {
        method: 'GET', // Corrected to GET
        headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
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

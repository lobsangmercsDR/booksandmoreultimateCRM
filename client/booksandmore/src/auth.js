import { decodeToken } from 'react-jwt';

export function isAuthenticated() {
  const token = localStorage.getItem('token');
  if (!token) {
    return false;
  }
  try {
    const decodedToken = decodeToken(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp > currentTime;
  } catch (error) {
    return false;
  }
}

export function getUser() {
  const token = localStorage.getItem('token');
  if (!token) {
    return null;
  }
  try {
    const decodedToken = decodeToken(token);
    return decodedToken;
  } catch (error) {
    return null;
  }
}

export function getUserRole() {
  const token = localStorage.getItem('token');
  if (!token) {
    return null;
  }
  try {
    const decodedToken = decodeToken(token);
    return decodedToken.role;
  } catch (error) {
    return null;
  }
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('role');
  window.location.href = '/login';
}

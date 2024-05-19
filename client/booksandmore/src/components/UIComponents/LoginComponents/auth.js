import jwt_decode from 'jwt-decode';

export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return false;
  }
  try {
    const decodedToken = jwt_decode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp > currentTime;
  } catch (error) {
    return false;
  }
};

export const getUser = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return null;
  }
  try {
    const decodedToken = jwt_decode(token);
    return decodedToken;
  } catch (error) {
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('role');
  window.location.href = '/login';
};

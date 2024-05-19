const CryptoJS = require('crypto-js');
const secretKey = process.env.COOKIE_SECRET_KEY;

const encryptCookie = (value) => {
  const encryptedValue = CryptoJS.AES.encrypt(value, secretKey).toString();
  return encryptedValue;
};

const decryptCookie = (encryptedValue) => {
  const decryptedBytes = CryptoJS.AES.decrypt(encryptedValue, secretKey);
  const decryptedValue = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return decryptedValue;
};

module.exports = {
  encryptCookie,
  decryptCookie,
};

const setStorage = (key, value) => {
    const dataAsString = JSON.stringify(value);
    localStorage.setItem(key, dataAsString);
};
const getStorage = (key) => {
  const value = localStorage.getItem(key);
  if (value == null || value == "undefined") {
    return null;
  }
  return JSON.parse(value);
};
const clearStorage = (key) => {
    localStorage.removeItem(key);
};

const storageHasData = () => localStorage.length > 0;
const getLocalStorage = (key, defaultValue) => {
  try {
    const stored = localStorage.getItem(key);

    if (stored !== null) {
      return JSON.parse(stored);
    } else {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    }
  } catch (error) {
    console.error("Error with localStorage key:", key, error);
    return defaultValue;
  }
};

const setLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error setting localStorage key", key, error);
  }
};

export { getLocalStorage, setLocalStorage };

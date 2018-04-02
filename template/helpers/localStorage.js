function ls() {
  /**
   * Modernizr test
   * @returns {boolean}
   */
  const isLocalStorageAvailable = () => {
    try {
      window.localStorage.setItem('test', 'test');
      window.localStorage.removeItem('test');
      return true;
    } catch (e) {
      return false;
    }
  };
  /**
   * Error object return if localStorage is unavailable
   * @type {{result: boolean, data: null, message: string}}
   */
  const error = {
    result: false,
    data: null,
    message: 'LocalStorage is not available',
  };

  /**
   * localStorage key where to store all settings
   * @type {string}
   */
  const rootKey = 'icex';
  let settings = {};

  return {
    getAllItems() {
      if (isLocalStorageAvailable()) {
        return {
          result: true,
          data: JSON.parse(window.localStorage.getItem(rootKey)),
        };
      }
      return error;
    },
    setItem(key, value) {
      if (isLocalStorageAvailable()) {
        settings = JSON.parse(window.localStorage.getItem(rootKey)) || {};
        settings[key] = value;
        window.localStorage.setItem(rootKey, JSON.stringify(settings));
        return {
          result: true,
          data: {
            [key]: value,
          },
        };
      }
      return error;
    },
    getItem(key) {
      if (isLocalStorageAvailable()) {
        const data = JSON.parse(window.localStorage.getItem(rootKey)) || {};
        return {
          result: true,
          data: data[key],
        };
      }
      return error;
    },
  };
}

export default ls();

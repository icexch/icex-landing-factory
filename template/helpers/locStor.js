let lStorage;
if (process.browser) {
  lStorage = window.localStorage;
}

const locStor = {
  set(key, val) {
    if (process.browser) {
      lStorage.setItem(`icex-${key}`, val);
    }
  },
  get(key) {
    if (process.browser) {
      return lStorage.getItem(`icex-${key}`);
    }
    return null;
  },
};

export default locStor;

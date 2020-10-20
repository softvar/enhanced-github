const storageUtil = {
  set: (key, value) => {
    storageUtil[key] = value;
  },
  get: key => {
    return storageUtil[key];
  }
};

module.exports = storageUtil;

export default class Storage {
  constructor() {
    this.store = localStorage;
  }

  set(key, data) {
    if(typeof data === "object") {
      localStorage.setItem(key, JSON.stringify(data));
    } else {
      localStorage.setItem(key, data);
    }

    return this;
  }

  get(key) {
    const data = localStorage.getItem(key);

    if(typeof data === "object") {
      return JSON.parse(localStorage.getItem(key));
    } else {
      return localStorage.getItem(key);
    }
  }

  clear(key) {
    return localStorage.removeItem(key);
  }

  overwrite(over, base) {
    return {
      ...over,
      ...base
    };
  }
}
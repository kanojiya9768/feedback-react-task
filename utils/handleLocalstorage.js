let getLocalstorage = (key) => {
  if (typeof window === "object") {
    return localStorage.getItem(key)
      ? JSON.parse(localStorage.getItem(key))
      : undefined;
  }
};

let setLocalStorage = (key, value) => {
  if (typeof window === "object") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};


export {
    getLocalstorage, setLocalStorage
};


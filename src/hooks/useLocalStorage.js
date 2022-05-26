import { useState } from "react";

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoreValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log("INVALID ITEM IN LOCAL STORAGE:", error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      setStoreValue(valueToStore);

      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.log("COULD NOT STORE VALUE:", error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;

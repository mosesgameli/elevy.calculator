import { createContext, useContext, useState } from "react";

const NotifyContext = createContext();

function NotifyProvider({ children }) {
  const [notification, setNotification] = useState({
    open: false,
    message: "",
  });

  const notify = (msg) => {
    if (typeof msg === "string") {
      setNotification((prev) => ({
        ...prev,
        open: true,
        message: msg,
      }));

      return;
    }

    setNotification((prev) => ({
      ...prev,
      open: false,
      message: "",
    }));
  };

  return (
    <NotifyContext.Provider value={{ notification, notify }}>
      {children}
    </NotifyContext.Provider>
  );
}

function useNotify() {
  return useContext(NotifyContext);
}

export { NotifyProvider, useNotify };

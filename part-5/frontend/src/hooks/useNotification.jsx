import { useState } from "react";

const useNotification = () => {
  const [notification, setNotification] = useState(null);

  const notify = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 5000);
  };

  return [notification, notify];
};

export default useNotification;

import { useEffect } from "react";

export default useDelayedFunction = (callback, delay, dep) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      callback();
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [callback, delay, [...dep]]);
};

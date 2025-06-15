import axios from "axios";
import { useEffect, useState } from "react";

const amIAuthenticated = async () => {
  const response = await axios.get("http://localhost:8787/me", {
    withCredentials: true,
  });
  if (response.status === 200) {
    return true;
  } else {
    return false;
  }
};

const useAuthentication = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState<boolean>(true);
  useEffect(() => {
    setIsChecking(true);
    const checkIfAuthenticated = async () => {
      const isAuthenticated = await amIAuthenticated();
      if (isAuthenticated) {
        setIsChecking(false);
        setIsLoggedIn(true);
      } else {
        setIsChecking(false);
        setIsLoggedIn(false);
      }
    };
    checkIfAuthenticated();
  }, []);

  return { isChecking, isLoggedIn };
};
export default useAuthentication;

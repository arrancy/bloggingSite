import { useEffect, useState } from "react";

const amIAuthenticated = async () => {
  try {
    const response = await fetch("http://localhost:8787/me");
    if (response.ok) {
      return true;
    } else {
      const refreshTokenResponse = await fetch(
        "http://localhost:8787/api/v1/user/refreshToken"
      );
      if (refreshTokenResponse.ok) {
        const newResponse = await fetch("http://localhost:8787/me");
        if (newResponse.ok) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
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

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import googleLogin from "../utils/googleLogin";
import { useAuth } from "../context/authContext";

const useGoogleAuth = (setLoggedIn) => {
  const { login } = useAuth();
  const [error, setError] = useState({ status: false, message: "" });
  const navigate = useNavigate();

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const res = await googleLogin(credentialResponse);
      const { data, status } = res;
      const { message, user, token } = data;

      if (status !== 200) {
        setError({ status: true, message });
        return;
      }

      setLoggedIn(true);
      login(user, token);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError({ status: true, message: "Google login failed" });
    }
  };

  return { handleGoogleLogin, error };
};

export default useGoogleAuth;

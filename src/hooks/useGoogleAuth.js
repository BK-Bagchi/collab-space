import { useNavigate } from "react-router-dom";
import { useState } from "react";
import googleLogin from "../utils/googleLogin";

const useGoogleAuth = (setLoggedIn) => {
  const [error, setError] = useState({ status: false, message: "" });
  const navigate = useNavigate();

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const res = await googleLogin(credentialResponse);
      const { data, status } = res;
      const { message } = data;

      if (status !== 200) {
        setError({ status: true, message });
        return;
      }

      if (localStorage.getItem("token")) {
        setLoggedIn(true);
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
      setError({ status: true, message: "Google login failed" });
    }
  };

  return { handleGoogleLogin, error };
};

export default useGoogleAuth;

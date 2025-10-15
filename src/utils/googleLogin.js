import { AuthAPI } from "../api";

const googleLogin = async (credentialResponse) => {
  try {
    if (!credentialResponse.credential)
      throw new Error("Google login failed: No credential returned");

    const token = credentialResponse.credential;
    const res = await AuthAPI.oauthLogin({ token });

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    return res.data;
  } catch (error) {
    console.error("Google login error:", error.response?.data || error.message);
  }
};

export default googleLogin;

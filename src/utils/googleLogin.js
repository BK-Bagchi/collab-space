import { AuthAPI } from "../api";

const googleLogin = async (credentialResponse) => {
  try {
    if (!credentialResponse.credential)
      throw new Error("Google login failed: No credential returned");

    const token = credentialResponse.credential;
    const res = await AuthAPI.oauthLogin({ token });

    return res;
  } catch (error) {
    console.error("Google login error:", error.response?.data || error.message);
    return error.response;
  }
};

export default googleLogin;

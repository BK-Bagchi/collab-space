import { AuthAPI } from "../api";
import { getDeviceId } from "./getDeviceId";

const googleLogin = async (credentialResponse) => {
  try {
    if (!credentialResponse.credential)
      throw new Error("Google login failed: No credential returned");

    const token = credentialResponse.credential;
    const device = {
      deviceId: getDeviceId(),
      platform: "WEB",
    };
    const res = await AuthAPI.oauthLogin({ token, device });

    return res;
  } catch (error) {
    console.error("Google login error:", error.response?.data || error.message);
    return error.response;
  }
};

export default googleLogin;

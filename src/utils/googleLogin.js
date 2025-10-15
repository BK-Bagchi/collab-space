// import axios from "axios";

const googleLogin = async (credentialResponse) => {
  try {
    if (!credentialResponse.credential)
      throw new Error("Google login failed: No credential returned");

    const token = credentialResponse.credential;
    console.log("Google token:", token);

    // // Send token to backend
    // const res = await axios.post("/api/auth/oauth", { token });

    // // res.data should have { message, user, token }
    // localStorage.setItem("token", res.data.token);
    // console.log("Logged in user:", res.data.user);

    // // Optionally redirect user
    // window.location.href = "/dashboard";
  } catch (error) {
    console.error("Google login error:", error.response?.data || error.message);
  }
};

export default googleLogin;

import * as handleLogin from "../services/userService.js";

let handleLoginApi = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing inputs parameter!",
    });
  }
  let userData = await handleLogin(email, password);
  return res.status(200).json({
    error: userData.errCode,
    message: userData.errMessage,
    // userData
    user: userData.user ? userData.user : `pls check all again!`,
  });
};
// module.exports = {
//   handleLogin: handleLogin,
// };
export { handleLoginApi };
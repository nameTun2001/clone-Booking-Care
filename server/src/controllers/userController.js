import {handleUserLogin} from "../services/userService.js";

const handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing inputs parameter!",
    });
  }
  const userData = await handleUserLogin(email, password);
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
export { handleLogin };
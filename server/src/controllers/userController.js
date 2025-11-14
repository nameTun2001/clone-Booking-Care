// import {handleUserLogin} from "../services/userService.js";
import * as userService from "../services/userService.js";

const handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing inputs parameter!",
    });
  }
  const userData = await userService.handleUserLogin(email, password);
  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    // userData
    user: userData.user ? userData.user : `pls check all again!`,
  });
};
const handleGetAllUser = async (req, res) => {
  let id = req.body.id;
  let user = await userService.getAllUser(id);
  console.log(user);
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameter",
      user: [],
    });
  }
  return res.status(200).json({
    errCode: 0,
    errMessage: "ok",
    user,
  });
};
export { handleLogin, handleGetAllUser };

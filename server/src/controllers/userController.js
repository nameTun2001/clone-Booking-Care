// import {userLogin} from "../services/userService.js";
import { response } from "express";
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
  const userData = await userService.userLogin(email, password);
  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    // userData
    user: userData.user ? userData.user : `pls check all again!`,
  });
};
const handleGetAllUser = async (req, res) => {
  let id = req.query.id;

  // console.log(user);
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameter",
      user: [],
    });
  }
  let user = await userService.getAllUser(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "ok",
    user,
  });
};
const handleCreateNewUser = async (req, res) => {
  let response = await userService.createNewUser(req.body);
  return res.status(200).json(response);
};
const handleDeleteUser = async (req, res) => {
  let response = await userService.deleteUser(req.body);
  return res.status(200).json(response);
};
const handleUpdateUser = async (req, res) => {
  let response = await userService.updateUser(req.body);
  return res.status(200).json(response);
};
export {
  handleLogin,
  handleGetAllUser,
  handleCreateNewUser,
  handleDeleteUser,
  handleUpdateUser,
};

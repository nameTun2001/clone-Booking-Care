import db from "../models/index.js";
import bcrypt from "bcryptjs";
import { hashUserPassword, getUserInfoById } from "./CRUDservice.js";
const userLogin = (userEmail, userPassword) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let checkEmail = await checkUserEmail(userEmail);
      if (checkEmail === true) {
        // userData.errCode = 0;
        // userData.errMessage = "Ok";
        let user = await db.User.findOne({
          attributes: ["email", "roleId", "password", "firstName", "lastName"],
          where: { email: userEmail },
          raw: true,
        });
        if (user) {
          let check = await bcrypt.compareSync(userPassword, user.password);
          if (check === true) {
            userData.errCode = 0;
            userData.errMessage = "Ok";
            //xoa password truoc khi tra ve user
            delete user.password;
            userData.user = user;
            resolve(userData);
          } else {
            userData.errCode = 3;
            userData.errMessage = "Wrong password!";
          }
        } else {
          userData.errCode = 2;
          userData.errMessage =
            "Your email isn't exist in our system. Please try other email!";
        }
      } else {
        userData.errCode = 1;
        userData.errMessage =
          "Your email isn't exist in our system. Please try other email!";
      }
      resolve(userData);
    } catch (error) {
      reject(error);
    }
  });
};

const checkUserEmail = async (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};
const getAllUser = async (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = "";
      if (userId === "ALL") {
        user = await db.User.findAll({
          attributes: {
            exclude: ["password"],
          },
        });
      }
      if (userId && userId !== "ALL") {
        user = await db.User.findOne({
          where: {
            id: userId,
          },
        });
      }
      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
};
const createNewUser = async (userData) => {
  return new Promise(async (resolve, reject) => {
    try {
      let checkUserExistion = await checkUserEmail(userData.email);
      if (checkUserExistion === false) {
        let new_password = await hashUserPassword(userData.password);
        await db.User.create({
          email: userData.email,
          password: new_password,
          firstName: userData.firstName,
          lastName: userData.lastName,
          address: userData.address,
          gender: userData.gender === "1" ? true : false,
          roleId: userData.roleId,
          positionId: userData.positionId,
          phoneNumber: userData.phoneNumber,
          image: userData.image,
        });
        resolve({
          errCode: 0,
          errMessage: "Create new user succeed",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage:
            "Your email isn't exist in our system. Please try other email!",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
const deleteUser = async (userData) => {
 
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userData.id },
      });

      if (user) {
        await db.User.destroy({
          where: { id: userData.id },
        });
        // let allUsers = await db.User.findAll();
        // resolve(allUsers);
        resolve({
          errCode: 0,
          errMessage: "The user is deleted.",
        });
      } else {
        resolve({
          errCode: 2,
          errMessage: "The user isn't exist.",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
const updateUser = async (userData) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!userData.email) {
        resolve({
          errCode: 2,
          errMessage: "Missing parameter!, pls input your email!",
          userData: [],
        });
      }
      let checkUserExistion = await checkUserEmail(userData.email);
      if (checkUserExistion == true) {
        await db.User.update(
          {
            email: userData.email,
            password: userData.password,
            firstName: userData.firstName,
            lastName: userData.lastName,
            address: userData.address,
            gender: userData.gender === "1" ? true : false,
            roleId: userData.roleId,
            positionId: userData.positionId,
            phoneNumber: userData.phoneNumber,
            image: userData.image,
          },
          { where: { email: userData.email } }
        );
        let allUsers = await db.User.findAll();
        resolve({
          errCode: 0,
          errMessage: "update the user succeeds!",
          allUsers,
        });
      } else {
        resolve({
          rrCode: 1,
          errMessage:
            "Your email isn't exist in our system. Please try other email!",
          allUsers,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
export {
  userLogin,
  checkUserEmail,
  getAllUser,
  createNewUser,
  deleteUser,
  updateUser,
};

import bcrypt from "bcryptjs";
import db from "../models/index.js";

const createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let new_password = await hashUserPassword(data.password);
      await db.User.create({
        email: data.email,
        password: new_password,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        gender: data.gender === "1" ? true : false,
        roleId: data.roleId,
        positionId: data.positionId,
        phoneNumber: data.phoneNumber,
        image: data.image,
      });
      resolve("ok create a new user succeed!");
    } catch (error) {
      reject(error);
    }
  });
};

const hashUserPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
  } catch (error) {
    throw error;
  }
};
const getAllUsers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = db.User.findAll({
        raw: true,
      });
      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
};
const getUserInfoById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId },
        raw: true,
      });
      if (user) {
        resolve(user);
      } else {
        resolve({});
      }
    } catch (error) {
      reject(error);
    }
  });
};
const updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    // try {
    //   let user = await db.User.findOne({
    //     where: { id: data.id },
    //     // raw: true,
    //   });
    //   if (user) {
    //     user.firstName = data.firstName;
    //     user.lastName = data.lastName;
    //     user.address = data.address;

    //     await user.save();
    //     resolve(user);
    //   }

    // } catch (error) {
    //   reject(error);
    // }
    try {
      await db.User.update(
        {
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
        },
        { where: { id: data.id } }
      );
      let allUsers = await db.User.findAll();
      resolve(allUsers);
    } catch (error) {
      reject(error);
    }
  });
};
const deleteUserById = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.User.destroy({
        where: {
          id: data.id,
        },
      });
      let allUsers = await db.User.findAll();
      resolve(allUsers);
    } catch (error) {
      reject(error);
    }
  });
};

export {
  createNewUser,
  hashUserPassword,
  getAllUsers,
  getUserInfoById,
  updateUserData,
  deleteUserById,
};

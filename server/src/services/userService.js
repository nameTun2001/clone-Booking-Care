import db from "../models/index.js";
import bcrypt from "bcryptjs";
// let salt = bcrypt.genSaltSync(10);
const handleUserLogin = (userEmail, userPassword) => {
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
// module.exports = {
//   handleLogin: handleLogin,
// };
export { handleUserLogin, checkUserEmail };

import db from "../models/index.js";
import * as CRUDservice from "../services/CRUDservice.js";
let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    return res.render("homepage.ejs", {
      data: JSON.stringify(data),
    });
  } catch (e) {
    console.log("Error: ", e);
  }

  return res.render("homepage.ejs");
};

let getAboutPage = (req, res) => {
  return res.render("test/about.ejs");
};

let getCRUDPage = (req, res) => {
  return res.render("crud.ejs");
};

let postCRUDPage = async (req, res) => {
  let message = await CRUDservice.createNewUser(req.body);
  console.log(message);

  return res.send("Post CRUD from server");
};

let displayGetCRUD = async (req, res) => {
  let data = await CRUDservice.getAllUsers();

  //gửi dữ liệu xuống file ejs để hiển thị user vô bảng
  return res.render("displayCRUD.ejs", {
    dataTable: data,
  });
};

let getEditCRUD = async (req, res) => {
  let userId = req.query.id;
  if (userId) {
    let userData = await CRUDservice.getUserInfoById(userId);
    //check user data not found
    if (userData) {
      return res.render("editCRUD.ejs", {
        user: userData,
      });
    } else {
      return res.send("User not found!");
    }
  } else {
    return res.send("User not found!");
  }
};
let putCRUD = async (req, res) => {
  let data = await req.body;
  console.log(data.id);
  
  let allUser = await CRUDservice.updateUserData(data);
  
  return res.render("displayCRUD.ejs", { dataTable: allUser });

};
let deleteCRUD = async (req, res) => {
  // let id = await req.body.id;
  let data = await req.query;
  // console.log(data.id);
  
  let allUser=await CRUDservice.deleteUserById(data);
  return res.render("displayCRUD.ejs", { dataTable: allUser });
};
export {
  getHomePage,
  getAboutPage,
  getCRUDPage,
  postCRUDPage,
  displayGetCRUD,
  getEditCRUD,
  putCRUD,
  deleteCRUD,
};

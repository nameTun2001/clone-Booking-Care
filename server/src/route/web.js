import express from "express";
import * as homeController from "../controllers/homeController.js";
import * as userController from "../controllers/userController.js";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/about", homeController.getAboutPage);
  router.get("/crud", homeController.getCRUDPage);

  router.post("/post-crud", homeController.postCRUDPage);
  router.get("/get-crud", homeController.displayGetCRUD);
  router.get("/edit-crud", homeController.getEditCRUD);
  router.post("/put-crud", homeController.putCRUD);
  router.get("/delete-crud", homeController.deleteCRUD);

  router.post("/api/login", userController.handleLogin);
  return app.use("/", router);
};

// module.exports = initWebRoutes;
export default initWebRoutes;

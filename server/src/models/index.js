// "use strict";
// import "dotenv/config";
// import fs from "fs";
// import path from "path";
// import { fileURLToPath } from "url";
// import Sequelize from "sequelize";
// import process from "process";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// import { pathToFileURL } from "url";
// const rawConfig = fs.readFileSync(
//   path.join(__dirname, "../config/config.json"),
//   "utf-8"
// );
// const jsonConfig = JSON.parse(rawConfig);



// // const __filename = fileURLToPath(import.meta.url);
// const basename = path.basename(__filename);
// // const __dirname = path.dirname(__filename);
// // // import JSON động
// // const configModule = await import(`../config/config.json`, {
// //   assert: { type: "json" },
// // });
// // const config = configModule.default[env];


// const env = process.env.NODE_ENV || "development";
// const config = jsonConfig[env];
// // const config = require(__dirname + "/../config/config.json")[env];

// const db = {};

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(
//     config.database,
//     config.username,
//     config.password,
//     config
//   );
// }

// fs.readdirSync(__dirname)
//   .filter((file) => {
//     return (
//       file.indexOf(".") !== 0 &&
//       file !== basename &&
//       file.slice(-3) === ".js" &&
//       file.indexOf(".test.js") === -1
//     );
//   })
//   .forEach((file) => {
//     const model = require(path.join(__dirname, file))(
//       sequelize,
//       Sequelize.DataTypes
//     );
//     db[model.name] = model;
//   });

// Object.keys(db).forEach((modelName) => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// export default db;

"use strict";
import "dotenv/config";
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import Sequelize from "sequelize";
import process from "process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const env = process.env.NODE_ENV || "development";

// đọc config.json
const rawConfig = fs.readFileSync(
  path.join(__dirname, "../config/config.json"),
  "utf-8"
);
const jsonConfig = JSON.parse(rawConfig);
const config = jsonConfig[env];

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

const basename = path.basename(__filename);

// Hàm async để load tất cả model
async function loadModels() {
  const files = fs.readdirSync(__dirname).filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  });

  for (const file of files) {
    const modelPath = pathToFileURL(path.join(__dirname, file)).href;
    const modelModule = await import(modelPath);
    // nếu export default
    const model = modelModule.default(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  }

  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });
}

// gọi hàm loadModels
await loadModels();

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;

const fs = require("fs");
const path = require("path");
const AccessRole = require("../MiddleWares/AccessRole");

module.exports = (app) => {
  const routesPath = __dirname;

  fs.readdirSync(routesPath).forEach((file) => {

    if (file === "RoutesHandler.js") return;

    const filePath = path.join(routesPath, file);
    console.log(`✅ Loaded : ${filePath}`);

    const route = require(filePath);

    const routeName = "/api/" + file.split(".")[0]

    if (route.Access_Role) {
      app.use(routeName, AccessRole(...route.Access_Role), route);
    }else{
      app.use(routeName, route);
    }

  });
};

"use strict";

var controller = require("./controller");
var jwtCheck = require("../middleware/jwt_middleware");

module.exports = function(app) {
  app.route("/downloadFile").post(jwtCheck.checkToken, controller.downloadFile);
};

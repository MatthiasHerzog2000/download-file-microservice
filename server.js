var express = require("express");
var cors = require("cors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var helmet = require("helmet");
var jwtCheck = require("./middleware/jwt_middleware");
var app = express();
var port = process.env.PORT || 8082;
var routes = require("./api/routes");
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(
  "/private",
  jwtCheck.checkToken,
  express.static(path.join(__dirname, "public"))
);

routes(app);
app.listen(port, function() {
  console.log("Server started on port: " + port);
});

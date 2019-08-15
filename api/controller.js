"use strict";

var path = require("path");
var fs = require("fs");
var zip = require("../service/archive_folder");

var controllers = {
  downloadFile: async function(req, res) {
    console.log(req.body);
    var path = req.body.path;
    if (req.body.type === "directory") {
      var success = await zip.zipDirectory(path, req.body.path + ".zip");
      console.log(success);
      path = req.body.path + ".zip";
    }

    res.download(path, err => {
      if (req.body.type === "directory") {
        fs.unlinkSync(path);
      }
    });
  }
};

module.exports = controllers;

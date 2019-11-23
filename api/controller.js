"use strict";

var path = require("path");
var fs = require("fs");
var zip = require("../service/archive_folder");

var controllers = {
  downloadFile: async function(req, res) {
    var endType =  req.body.endType;
    var path = req.body.path;
    if(endType === 'mobile') {
      if (req.body.type === "directory") {
        var zip = await zip.zipDirectory(path, req.body.path + ".zip");
        console.log(success);
        path = req.body.path + ".zip";
      }
      const success = await fs.copyFile(
        path,
        "./public/" + req.body.name,
        err => {
          if (err) console.log(err);
          else
            res.send({
              success: true,
              outpath:
                "private/" + req.body.name
            });
        }
      );
    } else {
      
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
    }
    
};

module.exports = controllers;

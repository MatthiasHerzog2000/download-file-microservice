var fs = require("fs");
var archiver = require("archiver");
/**
 * @param {String} source
 * @param {String} out
 * @returns {Promise}
 */
let zipDirectory = (source, out) => {
  const archive = archiver("zip", { zlib: { level: 4 } });
  const stream = fs.createWriteStream(out, { flags: "w" });

  return new Promise((resolve, reject) => {
    archive
      .directory(source, false)
      .on("error", err => reject(err))
      .pipe(stream);

    stream.on("close", () => resolve(true));
    archive.finalize();
  });
};
module.exports = {
  zipDirectory: zipDirectory
};

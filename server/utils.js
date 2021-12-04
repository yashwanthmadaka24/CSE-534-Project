
   
"use strict";
const fs = require("fs");
const mime = require("mime");

module.exports = {
  getFile: function(path) {
    const filePath = `${__dirname}/${path}`;

    try {
      const content = fs.openSync(`../${path}` , "r");
      // const contentType = mime.lookup(`../${path}`);
      return {
        content,
        headers: {
          "content-type": 'media'
        }
      };
    } catch (e) {
      console.log('error => ', e)
      return null;
    }
  }
};
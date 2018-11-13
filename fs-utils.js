const fs = require("fs");

function readFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
}

function writeFile(filePath, contents) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, contents, err => {
      if (err) reject(err);
      resolve();
    });
  });
}

function directoryExists(filePath) {
  return new Promise(resolve => {
    fs.exists(filePath, exists => {
      resolve(exists);
    });
  });
}

function makeDirectory(directoryPath) {
  return new Promise((resolve, reject) => {
    fs.mkdir(directoryPath, err => {
      if (err) reject(err);
      resolve();
    });
  });
}

module.exports = { readFile, writeFile, directoryExists, makeDirectory };

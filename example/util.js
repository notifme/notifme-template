/* @flow */
const fs = require('fs')

function readFile (filePath /* : string */) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (error, content) => {
      error ? reject(error) : resolve(content.toString('utf8'))
    })
  })
}

module.exports = {
  readFile
}

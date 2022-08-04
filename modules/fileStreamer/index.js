import fs from 'fs'

export default {
  stream: function (path) {
    return fs.createReadStream(path)
  }
}
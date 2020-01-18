let exportObj = class {
  postWork() {}
}

if (process.env.AWS_GREENGRASS_GROUP_NAME !== undefined) {
 exportObj = require('aws-greengrass-ipc-sdk-js')
}

module.exports = exportObj

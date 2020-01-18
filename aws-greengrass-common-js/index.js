let exportObj = {
  envVars: {
    AUTH_TOKEN: '',
    MY_FUNCTION_ARN: '',
    SHADOW_FUNCTION_ARN: '',
    ROUTER_FUNCTION_ARN: ''
  },
  logging: {
    LocalWatchLogger: class {
      debug() {}
    }
  },
  FunctionArnFields: class {},
  buildFunctionArn: () => {}
}

if (process.env.AWS_GREENGRASS_GROUP_NAME !== undefined) {
  exportObj = require('aws-greengrass-common-js')
}

module.exports = exportObj

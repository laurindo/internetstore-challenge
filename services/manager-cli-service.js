const UtilsService = require('./utils-service');
const ErrorGenerator = require('../services/error-generator-service');
const GeneralConstant = require('../constants/general-constant');
const ERRORS = GeneralConstant.ERRORS;

const getConfigParams = processEnvArguments => {
  try {
    if (processEnvArguments.length === 0) {
      return ErrorGenerator.generate(ERRORS.error_need_pass_params);
    }
    const args = processEnvArguments.splice(2, processEnvArguments.length);

    if (!UtilsService.isMod(args.length) && args.length > 0) {
        throw new Error(ERRORS.help);
        return;
    }

    return UtilsService.breakArrayInObject(args);
  } catch (e) {
    return ErrorGenerator.generate(ERRORS.default, 500, e);
  }
};

exports.getConfigParams = getConfigParams;

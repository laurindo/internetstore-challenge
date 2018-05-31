const UtilsService = require('../services/utils-service');
const ErrorGenerator = require('../services/error-generator-service');
const GeneralConstant = require('../constants/general-constant');
const ERRORS = GeneralConstant.ERRORS;

exports.getData = (err, result, options) => {
  try {
    if (err) { throw ErrorGenerator.generate(ERRORS.some_error_happened, 500, { error: error }); }
    if (UtilsService.isYML(options)) {
      const data = UtilsService.dataIsString(result) ? JSON.parse(result) : result;
      return data['default'];
    }
    return result;
  } catch (e) {
    return ErrorGenerator.generate(ERRORS.some_error_happened, 500, { error: e });  
  }
};
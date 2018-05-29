const UtilsService = require('../services/utils-service');
const ErrorGenerator = require('../services/error-generator-service');

exports.getData = (error, result, options) => {
  try {
    if (error) { throw ErrorGenerator.generate('Happened some error', null, 500, { details: error }); }
    if (UtilsService.isYML(options)) {
      const data = UtilsService.dataIsString(result) ? JSON.parse(result) : result;
      return data['default'];
    }
    return result;
  } catch (e) {
    return ErrorGenerator.generate('Happened some error', null, 500, { details: e });  
  }
};
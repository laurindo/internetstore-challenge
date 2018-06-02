const MergeData = require('../services/merge-data-service');
const ErrorGenerator = require('../services/error-generator-service');
const GeneralConstant = require('../constants/general-constant');
const ERRORS = GeneralConstant.ERRORS;

exports.processData = async (result, options) => {
  try {
    let dataProcessed = {};
    let dataMerged = {};
    if (options.siteId) {
      dataProcessed[options.siteId] = result;
      dataMerged = MergeData.mergeSiteWithEnv(dataProcessed, options);  
    } else {
      dataMerged = await MergeData.mergeEnviroments(options);  
    }
    return dataMerged;
  } catch (e) {
    return ErrorGenerator.generate(ERRORS.some_error_happened, 500, { error: e });
  }
};
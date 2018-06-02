const MergeDataService = require('../services/merge-data-service');
const ReadDataService = require('../services/read-data-service');
const ErrorGenerator = require('../services/error-generator-service');
const GeneralConstant = require('../constants/general-constant');
const ERRORS = GeneralConstant.ERRORS;

exports.processData = async options => {
  try {
    let result = {};
    let dataMerged = {};
    if (options.siteId) {
      result = await ReadDataService.readData(options.pathName);
      dataMerged = MergeDataService.mergeSiteWithEnv(result, options);
    } else {
      dataMerged = await MergeDataService.mergeEnviroments(options);
    }
    return dataMerged;
  } catch (e) {
    return ErrorGenerator.generate(ERRORS.some_error_happened, 500, { error: e });
  }
};
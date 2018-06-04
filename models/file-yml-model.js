const fs = require('fs');
const yaml = require('js-yaml');

const MergeDataService = require('../services/merge-data-service');
const ErrorGenerator = require('../services/error-generator-service');
const UtilsService = require('../services/utils-service');
const ReadDataService = require('../services/read-data-service');
const GeneralConstant = require('../constants/general-constant');
const ERRORS = GeneralConstant.ERRORS;
const ENV = GeneralConstant.ENV;
const DEFAULT = GeneralConstant.DEFAULT;

exports.processData = async (result, options) => {
  try {
    if (options.siteId) {
      let dataProcessed = {};
      if (result.default) {
        dataProcessed[options.siteId] = result.default;
      } else {
        dataProcessed[options.siteId] = result;
      }
      return MergeDataService.mergeSiteWithEnv(dataProcessed, options);
    }
    return await MergeDataService.performPromisesAndMergeResult(options);
  } catch (e) {
    return ErrorGenerator.generate(ERRORS.some_error_happened, 500, { error: e });
  }
};

exports.readFileYML = async options => {
  try {
      let result = await this.readData(options.pathName);
      let dataMerged = await this.processData(result, options);
      options.callback(null, dataMerged, options);
  } catch (e) {
      const error = ErrorGenerator.generate(ERRORS.error_parse, 500, { error: e.error });
      options.callback(error);
  }
};

exports.readData = async pathName => {
  return yaml.safeLoad(fs.readFileSync(pathName, 'utf8'));
};

exports.mergeDataWithEnvs = (result, dataFromFile) => {
  try {
    Object.keys(result).forEach(key => {
      if (key === DEFAULT) {
        result[DEFAULT][ENV.prod] = MergeDataService.mergeEnv(result[DEFAULT], ENV.prod, dataFromFile[DEFAULT]);
        result[DEFAULT][ENV.dev] = MergeDataService.mergeEnv(result[DEFAULT], ENV.dev, dataFromFile[DEFAULT]);
        result[DEFAULT][ENV.qa] = MergeDataService.mergeEnv(result[DEFAULT], ENV.qa, dataFromFile[DEFAULT]);
      } else {
        result[ENV.prod] = MergeDataService.mergeEnv(result, ENV.prod, dataFromFile);
        result[ENV.dev] = MergeDataService.mergeEnv(result, ENV.dev, dataFromFile);
        result[ENV.qa] = MergeDataService.mergeEnv(result, ENV.qa,  dataFromFile);
      }
    });
    return result;
  } catch (e) {
    return ErrorGenerator.generate(ERRORS.error_read_object_keys, 500, { error: e });
  }
};

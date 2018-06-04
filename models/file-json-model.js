const fs = require('fs');
const util = require('util');
const ReadFilePromisify = util.promisify(fs.readFile);

const MergeDataService = require('../services/merge-data-service');
const ReadDataService = require('../services/read-data-service');
const UtilsService = require('../services/utils-service');
const ErrorGenerator = require('../services/error-generator-service');
const GeneralConstant = require('../constants/general-constant');
const ERRORS = GeneralConstant.ERRORS;
const ENV = GeneralConstant.ENV;

exports.processData = async options => {
  try {
    if (options.siteId) {
      const result = await this.readData(options.pathName);
      return MergeDataService.mergeSiteWithEnv(result, options);
    }
    return await MergeDataService.performPromisesAndMergeResult(options);
  } catch (e) {
    return ErrorGenerator.generate(ERRORS.some_error_happened, 500, { error: e });
  }
};

exports.readData = async pathName => {
  const data = await ReadFilePromisify(pathName, 'utf8').catch(err => { return err });
  try {
      return JSON.parse(data);
  } catch (e) {
      return ErrorGenerator.generate(ERRORS.error_parse, 500, { error: e });
  }
};

exports.readFileJSON = async options => {
  try {
    const result = await this.processData(options);
    options.callback(null, result, options);
  } catch (e) {
    const error = ErrorGenerator.generate(ERRORS.error_parse, 500, { error: e });
    options.callback(error);
  }
};

exports.mergeDataWithEnvs = (result, dataFromFile) => {
  try {
    Object.keys(result).forEach(key => {
      result[key][ENV.prod] = MergeDataService.mergeEnv(result[key], ENV.prod, dataFromFile);
      result[key][ENV.dev] = MergeDataService.mergeEnv(result[key], ENV.dev, dataFromFile);
      result[key][ENV.qa] = MergeDataService.mergeEnv(result[key], ENV.qa,  dataFromFile);
    });
    return result;
  } catch (e) {
    return ErrorGenerator.generate(ERRORS.error_read_object_keys, 500, { error: e });
  }
};

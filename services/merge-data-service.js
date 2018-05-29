const ReadDataService = require('./read-data-service');
const ErrorGenerator = require('../services/error-generator-service');
const GeneralConstant = require('../constants/general-constant');
const ENV = GeneralConstant.ENV;

  /**
   * Spread objects to merge inside one object
   * @param {array/object} ...args - operator spread to expand object and merge inside one main object
  */
  exports.merge = (...args) => {
      return Object.assign({}, ...args);
  };

  /**
   * 
   * Function to merge differents enviroments inside object site
   * Example output:
   * {
   *  'anpl': {
   *    'development': {
   *      // ... data
   *    },
   *    'production': {
   *      // ... data
   *    }
   *  },
   *  'bkbe': {
   *    'development': {
   *      // ... data
   *    },
   *    'staging': {
   *      // ... data
   *    },
   *    'production': {
   *      // ... data
   *    }
   *  }
   * }
   * @param {string} objeEnv        -  Object
   * @param {string} env            -  Environment that represents production/staging/development
   * @param {string} dataFromFile   -  Data loaded from specific file .json or .yaml
  */
  exports.mergeEnv = (objEnv, env, dataFromFile) => {
    try {
      if (objEnv[env]) {
          objEnv[env] = Object.assign({}, dataFromFile[env], objEnv[env]);
      } else {
          objEnv[env] = Object.assign({}, dataFromFile[env]); 
      }
      return objEnv[env];
    } catch (e) {
      return ErrorGenerator.generate(ERRORS.error_parse, '', 500, { details: e });
    }
  };

  /**
   * Merge data from all enviroments - production/staging/development
  */
  exports.mergeEnviroments = async options => {
    try {
      self = this;
      const result = await ReadDataService.readAllPromises(options);
      let dataFromFile = await ReadDataService.readData(ReadDataService.getPathName(`${options.configName}`, options.extension));
      Object.keys(result).forEach(key => {
          result[key][ENV.prod] = self.mergeEnv(result[key], ENV.prod, dataFromFile);
          result[key][ENV.dev] = self.mergeEnv(result[key], ENV.dev, dataFromFile);
          result[key][ENV.qa] = self.mergeEnv(result[key], ENV.qa,  dataFromFile);
      });
      return result;
    } catch (e) {
      return ErrorGenerator.generate(ERRORS.error_parse, '', 500, { details: e });
    }
  };

  /**
   * Merge siteId with enevironment and return the specific data
   * @param {object} result   - object with data read from file
   * @param {object} options  - object with some params or options important to return the correct data
  */
  exports.mergeSiteWithEnv = (result, options) => {
    if (options.commands && options.commands.only_env) {
      return result[options.siteId];
    }
    return result[options.siteId][options.environment];
  };
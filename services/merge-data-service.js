const ReadDataFactoryService = require('./read-data-factory-service');
const ReadDataService = require('./read-data-service');
const UtilsService = require('./utils-service');
const ErrorGenerator = require('../services/error-generator-service');
const GeneralConstant = require('../constants/general-constant');
const ENV = GeneralConstant.ENV;
const ERRORS = GeneralConstant.ERRORS;

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
      return ErrorGenerator.generate(ERRORS.error_parse, 500, { error: e });
    }
  };

  /**
   * Merge data from all enviroments - production/staging/development
  */
  exports.mergeEnviroments = async (targetData, options) => {
    try {
      if (!options) { ErrorGenerator.generate(ERRORS.options_not_be_empty, 404, { error: null }); }
      const envDataFileName = UtilsService.getPathName(`${options.configName}`, options.extension);
      let factory = ReadDataFactoryService.load(options.extension);
      let dataFromFile = await factory.readData(envDataFileName);
      return factory.mergeResultByEachENVList(targetData, dataFromFile);
    } catch (e) {
      return ErrorGenerator.generate(ERRORS.error_parse, 500, { error: e });
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

  exports.performPromisesAndMergeResult = async options => {
    const targetData = await ReadDataService.readAllPromises(options);
    return await this.mergeEnviroments(targetData, options);
  };

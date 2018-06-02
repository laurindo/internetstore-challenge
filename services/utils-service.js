const ErrorGenerator = require('./error-generator-service');
const GeneralConstant = require('../constants/general-constant');
const EXTENSIONS = GeneralConstant.EXTENSIONS;
const ERRORS = GeneralConstant.ERRORS;
const TYPES = GeneralConstant.TYPES;
const FIXTURE_PATH = GeneralConstant.FIXTURE_PATH;
const ENV = GeneralConstant.ENV;

/**
 * Given a number check if operation MOD return true
 * 
 * Example Input number = 2
 * Example Output:
 *  - true
 * 
 * Example Input number = 3
 * Example Output:
 *  - false
 * 
 * @param {string} number     [required]
 * @param {int} divisor       [optional]
*/
exports.isMod = (number, divisor = 2) => {
  try {
    number = parseInt(number);
    divisor = parseInt(divisor);
    if (!number || divisor === 0) {
      return false;
    }
    return number % divisor === 0;
  } catch (e) {
    return ErrorGenerator.generate(ERRORS.error_on_perform_mod, 500, { error: e });
  }
};

/**
 * Given an object check if has a extension YML
 * 
 * Example Input with { extension: 'yml' }
 * Example Output:
 *  - true
 * 
 * Example Input with { extension: 'yaml' }
 * Example Output:
 *  - true
 * 
 * @param {object} obj - { extension: 'yml | yaml' }     [required]
*/
exports.isExtensionYML = options => {
  return options && (options.extension === EXTENSIONS.yml || options.extension === EXTENSIONS.yaml);
};

/**
 * Given an object check if has a extension JSON
 * 
 * Example Input with { extension: 'json' }
 * Example Output:
 *  - true
 * 
 * @param {object} obj - { extension: 'json' }     [required]
*/
exports.isExtensionJSON = options => {
  return options && (options.extension === EXTENSIONS.json);
};

/**
 * Given an object or string check if typeof is object
 * 
 * Example Input with '{\'only_env\': \'true\'}'
 * Example Output:
 *  - false
 * 
 * Example Input with {only_env: true}
 * Example Output:
 *  - true
 * 
 * @param {object | string} obj - {only_env:true}     [required]
*/
exports.isObject = obj => {
  return this.checkTypeOf(obj, TYPES.object);
};

/**
 * Given an object or string check if typeof is string
 * 
 * Example Input with '{\'only_env\': \'true\'}'
 * Example Output:
 *  - true
 * 
 * Example Input with {only_env: true}
 * Example Output:
 *  - false
 * 
 * @param {object | string} obj - {only_env:true}     [required]
*/
exports.dataIsString = obj => {
  return this.checkTypeOf(obj, TYPES.string);
};

exports.checkTypeOf = (obj, type) => {
  if (!obj) { return null; }
  switch (type) {
    case TYPES.object:
      return typeof obj === TYPES.object;
    case TYPES.string:
      return typeof obj === TYPES.string;
    default:
      return null;
  }
};

exports.validateCommandsJSON = options => {
  try {
    if (options && options.commands && this.dataIsString(options.commands)) {
        return JSON.parse(options.commands);
    } else if (options && options.commands && this.isObject(options.commands)) {
        return options.commands;
    } else if ((options.siteId === 'default' || !options.siteId) && this.isExtensionYML(options)) {
        return { ...options.commands, default: true };
    }
    return null;
  } catch (e) {
    return ErrorGenerator.generate(ERRORS.error_parse, 500, { error: e });
  }
};

/**
 * Given a list(array) should return a object
 * 
 * Example Input with ['-cn', 'checkout', '-si', 'anpl']
 * 
 * Example Output:
 *  - { cn: 'checkout', si: 'anpl' }
 * 
 * @param {array} list - checkout       [required]
*/
exports.breakArrayInObject = (list) => {
  const self = this;
  let config = {};
  let tempKey = '';

  list.forEach(function (value, index) {
      if (self.isMod(index) || index === 0) {
          config[value] = '';
          tempKey = value;
      } else {
          config[tempKey] = value;
      }
  });
  
  return config;
};

/**
 * Given a configName and(or) siteId should return a File Name
 * 
 * Example Input with 'configName'
 *  - configName:   'checkout'
 *  - siteId:       'anpl'
 * 
 * Example Output:
 *  - 'checkout_anpl'
 * 
 * Example Input with only 'configName'
 *  - configName:   'checkout'
 * 
 * Example Output:
 *  - 'checkout'
 * 
 * @param {string} configName   - checkout  [required]
 * @param {string} siteId       - anpl      [optional]
*/
exports.getFileName = (configName, siteId) => {
  if (configName && siteId) {
      return `${configName}_${siteId}`;
  } else if (configName) {
      return `${configName}`;
  }
  return null;
};

/**
* Given a fileName and extension, should return a relative Path Name
* Example Input
*  - fileName: 'checkout'
*  - extension: 'json'
* 
* Example Output
*  - './fixtures/checkout.json'
* 
* @param {string} fileName   - checkout        [required]
* @param {string} extension  - json/yaml/yml   [required]
*/
exports.getPathName = (fileName, extension) => {
  return `${FIXTURE_PATH}/${fileName}.${extension}`;
};

exports.getEnvironment = () => {
  if (process.env.NODE_ENV) {
    return `.env.${process.env.NODE_ENV}`;
  }
  return `.env.${ENV.dev}`;
};
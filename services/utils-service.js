const GeneralConstant = require('../constants/general-constant');
const EXTENSIONS = GeneralConstant.EXTENSIONS;

exports.isYML = options => {
  return options && (options.extension === EXTENSIONS.yml || options.extension === EXTENSIONS.yaml);
};

exports.isJSON = options => {
  return options && (options.extension === EXTENSIONS.json);
};

exports.isObject = obj => {
  if (obj) {
    return typeof obj === 'object';
  }
  return null;
};

exports.dataIsString = obj => {
  if (obj) {
    return typeof obj === 'string';
  }
  return null;
};

exports.validateCommandsJSON = options => {
  if (options && options.commands && this.dataIsString(options.commands)) {
      return JSON.parse(options.commands);
  } else if (options && options.commands && this.isObject(options.commands)) {
      return options.commands;
  } else if ((options.siteId === 'default' || !options.siteId) && this.isYML(options)) {
      return { ...options.commands, default: true };
  }
  return null;
};
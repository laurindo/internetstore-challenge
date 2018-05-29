const GeneralConstant = require('../constants/general-constant');
const EXTENSIONS = GeneralConstant.EXTENSIONS;

exports.isYML = options => {
  return options.extension === EXTENSIONS.yml || options.extension === EXTENSIONS.yaml;
};

exports.isJSON = options => {
  return options.extension === EXTENSIONS.json;
};

exports.dataIsString = obj => {
  return typeof obj === 'string';
};

exports.validateCommandsJSON = options => {
  if (options && options.commands && typeof options.commands === 'string') {
      return JSON.parse(options.commands);
  } else if (options && options.commands && typeof options.commands === 'object') {
      return options.commands;
  } else if ((options.siteId === 'default' || !options.siteId) && this.isYML(options)) {
      return { ...options.commands, default: true };
  }
  return null;
};
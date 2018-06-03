const FileJSONModel = require('../models/file-json-model');
const FileYMLModel = require('../models/file-yml-model');
const GeneralConstant = require('../constants/general-constant');
const EXTENSIONS = GeneralConstant.EXTENSIONS;

const factories = {
  yml: {
    readData: FileYMLModel.readData,
    mergeResultByEachENVList: FileYMLModel.mergeDataWithEnvs 
  },
  json: {
    readData: FileJSONModel.readData,
    mergeResultByEachENVList: FileJSONModel.mergeDataWithEnvs
  }
};

/**
 * Load correct factory to perform some specific functionality
*/
exports.load = extension => {
  switch (extension) {
    case EXTENSIONS.yaml:
    case EXTENSIONS.yml:
      return factories.yml;
    case EXTENSIONS.json:
      return factories.json;
    default:
      return {};
  }
};
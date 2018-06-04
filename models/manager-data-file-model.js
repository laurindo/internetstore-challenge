const UtilsService = require('../services/utils-service');
const ManagerCLIService = require('../services/manager-cli-service');
const ReadDataService = require('../services/read-data-service');
const ErrorGenerator = require('../services/error-generator-service');
const GeneralConstant = require('../constants/general-constant');
const ERRORS = GeneralConstant.ERRORS;
const CLI_PARAMS = GeneralConstant.CLI_PARAMS;
const DEFAULT = GeneralConstant.DEFAULT;

exports.getData = (err, result, options) => {
  try {
    if (err) { throw ErrorGenerator.generate(ERRORS.some_error_happened, 500, { error: error }); }

    if (UtilsService.isExtensionYML(options)) {
      const data = UtilsService.dataIsString(result) ? JSON.parse(result) : result;
      return (data[DEFAULT]) ? data[DEFAULT] : data;
    }
    return result;
  } catch (e) {
    return ErrorGenerator.generate(ERRORS.some_error_happened, 500, { error: e });
  }
};

exports.getDataByAPI = (req, res) => {
  try {
    const _config_name = req.query.configName;
    const _site_id = req.query.siteId;
    const _env = req.query.env;
    const _extension = req.query.extension;
    const _command = {
      only_env: req.query.onlyEnv
    };
    const callback = (err, result, options) => {
      const resultData = this.getData(err, result, options);
      res.status(200).json(resultData);
    };
    this.start(_config_name, _site_id, _env, _extension, _command, callback);
  } catch (e) {
    return ErrorGenerator.generate(ERRORS.some_error_happened, 500, { error: e });
  }
};

exports.start = (_config_name, _site_id, _env = 'production', _extension = 'json', _command, callback) => {
  const self = this;

  if (typeof callback !== 'function') {
    callback = (err, result, options) => {
      const resultData = self.getData(err, result, options);
      console.log(resultData);
    };
  }

  /**
   * CONFIG
  */
  const config = ManagerCLIService.getConfigParams(process.argv);
  const configName = _config_name || config[CLI_PARAMS.cn];
  const siteId = _site_id || config[CLI_PARAMS.si];
  const environment = _env || config[CLI_PARAMS.ev];
  const extension = _extension || config[CLI_PARAMS.ex];
  const commands = _command || config[CLI_PARAMS.cm];

  ReadDataService.getConfig(configName, siteId, environment, {
      extension,
      commands,
      callback
  });
};

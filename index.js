const GeneralConstant = require('./constants/general-constant');
const ReadDataService = require('./services/read-data-service');
const ManagerCLIService = require('./services/manager-cli-service');
const ManagerDataFileModel = require('./models/manager-data-file-model');
const CLI_PARAMS = GeneralConstant.CLI_PARAMS;

/**
 * CONFIG
*/
const config = ManagerCLIService.getConfigParams();
const configName = config[CLI_PARAMS.cn];
const siteId = config[CLI_PARAMS.si];
const environment = config[CLI_PARAMS.ev];
const extension = config[CLI_PARAMS.ex];
const commands = config[CLI_PARAMS.cm];

/**
 * READING and FORMATTING DATA
*/
const callback = (error, result, options) => {
    const dataFormatted = ManagerDataFileModel.getData(error, result, options);
    console.log(dataFormatted);
};

//ReadDataService.getConfig(configName, siteId, extension, environment, commands, callback);
ReadDataService.getConfig(configName, siteId, environment, {
    extension,
    commands,
    callback
}); 
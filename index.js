const GeneralConstant = require('./constants/general-constant');
const ReadDataService = require('./services/read-data-service');
const ManagerCLIService = require('./services/manager-cli-service');
const CLI_PARAMS = GeneralConstant.CLI_PARAMS;

/**
 * CONFIG
*/
const config = ManagerCLIService.getConfigParams();
const configName = config[CLI_PARAMS.cn];
const siteId = config[CLI_PARAMS.si];
const environment = config[CLI_PARAMS.ev];
const extension = config[CLI_PARAMS.ex];
const command = config[CLI_PARAMS.cm];

/**
 * READING DATA
*/
const callback = (error, result, options) => {
    if (error) { return 'Occurred some error'; }
    
    const env = options.environment;
    const site = options.siteId;
    const all = options.command;
    let dataFiltered = {};

    console.log(result);
    return;

    if (all) {
        console.log(result);
        return;
    }

    if (site && env) {
        dataFiltered = result[site][env];
        //console.log(dataFiltered);
    } else if (!site && env) {
        dataFiltered = result[env];
        //console.log(dataFiltered);
    }
};

//ReadDataService.getConfig(configName, siteId, extension, environment, command, callback);
ReadDataService.getConfig(configName, siteId, environment, {
    extension,
    command,
    callback
});
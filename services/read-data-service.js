const ReadDataFactoryService = require('../services/read-data-factory-service');
const MergeDataService = require('./merge-data-service');
const FileJSONModel = require('../models/file-json-model');
const FileYMLModel = require('../models/file-yml-model');
const ErrorGenerator = require('./error-generator-service');
const UtilsService = require('./utils-service');
const GeneralConstant = require('../constants/general-constant');
const SITES = GeneralConstant.SITES;
const ERRORS = GeneralConstant.ERRORS;

exports.readAllPromises = async options => {
    const self = this;
    let sitesMerged = {};       // make a merge between files config
    let promises = [];          // list of array to be resolved using Promise.all
    let promiseResults = null;  // results of resolved promises

    // For each site I need to get the data inside the .json or .yaml
    SITES.forEach(async site => {
        const pathName = UtilsService.getPathName(`${options.configName}_${site}`, options.extension);
        let factory = ReadDataFactoryService.load(options.extension);
        let res = factory.readData(pathName).catch(error => []);
        promises.push(res); 
    });

    // Get all promises resolved inside array
    promiseResults = await Promise.all(promises).catch(error => []);
    promiseResults.forEach(result => {
        if (result && !result.error) {
            sitesMerged = Object.assign({}, sitesMerged, result);
        }
    });

    return sitesMerged;
};

exports.proxyReadFile = options => {
    if (UtilsService.isExtensionJSON(options)) {
      FileJSONModel.readFileJSON(options);
    } else if (UtilsService.isExtensionYML(options)) {
      FileYMLModel.readFileYML(options);
    }
};

/**
 * @param {string} configName       - file name                                         [required]
 * @param {string} siteId           - name site                                         [optional]
 * @param {string} environment      - environment name (development/staging/production) [optional]
 * @param {object} options          - some extra params                                 [optional]
*/
exports.getConfig = (configName, siteId, environment = 'production', options) => {
    const fileName = UtilsService.getFileName(configName, siteId);
    const pathName = UtilsService.getPathName(fileName, options.extension);
    const commands = UtilsService.validateCommandsJSON(options);
    options = MergeDataService.merge(options, {
        pathName,
        configName, 
        siteId,
        environment,
        commands
    });

    if (!fileName) {
        options.callback(ErrorGenerator.generate(ERRORS.name_and_extension_required));
    }

    // Call File Stream to read the path file and execute callback
    this.proxyReadFile(options);

};
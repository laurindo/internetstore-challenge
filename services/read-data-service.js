const fs = require('fs');
const yaml = require('js-yaml');
const util = require('util');
const ReadFilePromisify = util.promisify(fs.readFile);

const MergeData = require('./merge-data-service');
const ErrorGenerator = require('./error-generator-service');
const UtilsService = require('./utils-service');
const GeneralConstant = require('../constants/general-constant');
const EXTENSIONS = GeneralConstant.EXTENSIONS;
const SITES = GeneralConstant.SITES;
const ENV = GeneralConstant.ENV;
const ERRORS = GeneralConstant.ERRORS;

exports.readData = async pathName => {
    const data = await ReadFilePromisify(pathName, 'utf8').catch(err => { return err });
    try {
        return JSON.parse(data);
    } catch (e) {
        return ErrorGenerator.generate(ERRORS.error_parse, 500, { error: e });
    }
};

exports.readAllPromises = async options => {
    const self = this;
    let sitesMerged = {};       // make a merge between files config
    let promises = [];          // list of array to be resolved using Promise.all
    let promiseResults = null;  // results of resolved promises

    // For each site I need to get the data inside the .json or .yaml
    SITES.forEach(async site => {
        let res = self.readData(UtilsService.getPathName(`${options.configName}_${site}`, options.extension));
        promises.push(res); 
    });

    // Get all promises resolved inside array
    promiseResults = await Promise.all(promises);
    promiseResults.forEach(result => {
        if (result && !result.error) {
            sitesMerged = Object.assign({}, sitesMerged, result);
        }
    });

    return sitesMerged;
};

exports.readFileJSON = async options => {
    try {
        let result = null;
        let err = null;
        
        if (options.siteId) {
            result = await this.readData(options.pathName);
            result = MergeData.mergeSiteWithEnv(result, options);
        } else {
            result = await MergeData.mergeEnviroments(options);
        }
    
        options.callback(null, result, options);
    } catch (e) {
        const error = ErrorGenerator.generate(ERRORS.error_parse, 500, { error: e });
        options.callback(error);
    }
};

exports.readFileYML = options => {
    try {
        const callback = options.callback;
        const config = yaml.safeLoad(fs.readFileSync(options.pathName, 'utf8'));
        const indentedJson = JSON.stringify(config, null, 4);
        callback(null, indentedJson, options);
    } catch (e) {
        const error = ErrorGenerator.generate(ERRORS.error_parse, 500, { error: e });
        options.callback(error);
    }
};

exports.proxyReadFile = options => {
    if (UtilsService.isExtensionJSON(options)) {
        this.readFileJSON(options);
    } else if (UtilsService.isExtensionYML(options)) {
        this.readFileYML(options);
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
    options = MergeData.merge(options, {
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